<?php

namespace RestDoc;

use Concise\Routing\Route;
use Concise\Routing\Handle\CurrecyHandle;
use Concise\Foundation\Config;
use Concise\Cache\Cache;
use Concise\Container\Container;
use RestDoc\Parse\DocParserFactory;

class Repository
{
	use RestDocRequestRealization;

	/**
	 * 保存key
	 * @var string
	 */
	CONST SAVE_KEY = 'concise_rest_api_doc';

	/**
	 * 路由对象
	 * @var \Concise\Routing\Route
	 */
	protected $router;

	/**
	 * doc array
	 * @var array
	 */
	protected $doc = [];

	/**
	 * 配置
	 * @var array
	 */
	protected $config = [
		'name'   => 'MyApi',
		'return' => [],
		'params' => [],
		'request_handle' => null
	];

	protected $postData;

	protected $keyName;

	public function __construct ()
	{
		$this->config = array_merge($this->config,Config::scope('doc')->get() ? Config::scope('doc')->get() : []);
	}

	public function bind (Route $router)
	{
		$this->router = $router;
		return $this;
	}

	public function getConfig ()
	{
		return $this->config;
	}

	public function auth ($password = '')
	{
		if (!empty($password)) {
			if ($password === $this->config['auth']['password']) {
				session('restdoc_auth',$password);
			}
		}
		return session('restdoc_auth');
	}

	/**
	 * 渲染文档
	 * @param  string $view 
	 * @return mixed
	 */
	public function render ($view = '')
	{
		if (empty($view)) {
			$path = __DIR__ . '/Resources/index.html';
		} else {
			$path = __DIR__ . '/Resources/view/' . $view .'.html';
		}
		include $path;
	}

	/**
	 * build doc
	 * @param string $module 
	 * @param string $prefix
	 * @param string $name
	 * @return object
	 */
	public function buildApiDocumentRoute ($prefix = 'doc',$module = '',$namespace = 'RestDoc\Http\Controller')
	{
		return $this->router->group(['module' => $module,'prefix' => $prefix,'namespace' => $namespace],function () {
			$this->router->middleware(\RestDoc\Http\Middleware\Authenticate::class)->group(function () {
				 $this->router->get('/',"ApiDocumentController@index")->name('restdoc.index');
				 $this->router->get('home',"ApiDocumentController@home")->name('restdoc.home');
				 $this->router->post('read',"ApiDocumentController@read")->name('restdoc.read');
				 $this->router->post('get',"ApiDocumentController@get")->name('restdoc.get');
				 $this->router->post('detail',"ApiDocumentController@detail")->name('restdoc.detail');
			});
			$this->router->get('auth',"AuthController@index")->name('restdoc.auth');
			$this->router->post('auth',"AuthController@auth");
		});
	}

	/**
	 * 生成文档
	 * @return mixed
	 */
	public function build ()
	{
		$rules = $this->router->document->all();
		foreach ($rules as $item) {
			$rule = $item['rule'];
			if (is_string($rule->handle)) {
				$result = $this->buildClass($rule);
				$groupParams = is_array($result['groupParams']) ? $result['groupParams'] : [];
				$docParams   = isset($groupParams['doc']) ? $groupParams['doc'] : [];
				$requestUrl = $this->router->parseRoutPath($rule)[0]['path'];				
				$this->doc[] = [
					 'class'       => $result['class'],
					 'method'      => $result['method'],
					 'request'     => $rule->method,
					 'docParams'   => $docParams,
					 'methodName'  => '',
					 'requestUrl'  => $requestUrl,
					 'params'      => $item['params'],
					 'return'      => $item['return'],
				];
			}
		}
		if (!empty($this->doc)) {
			foreach ($this->doc as $k => $item) {
				$comment = $this->getClassMethodComment($item['class'],$item['method']);
				
				if (!$comment) {
					continue;
				}

				$docParam    = $item['params'];
				$docReturn   = $item['return'];

				$docParams 	= $item['docParams'];
				$groupDocParam  = isset($docParams['params']) ? $docParams['params'] : [];
				$groupDocReturn = isset($docParams['return']) ? $docParams['return'] : [];


				$result = DocParserFactory::parse($comment);
				if (empty($item['requestUrl'])) {
					$this->doc[$k]['requestUrl'] = isset($result['requestUrl']) ? $result['requestUrl'] : '';
				}
				if ($item['request'] == 'ANY') {
					$this->doc[$k]['request'] = isset($result['requestName']) ? strtoupper($result['requestName']) : 'GET';
				}
				$this->doc[$k]['methodName']  = $result['methodName'];
				$this->doc[$k]['desc']        = $result['desc'];
				$this->doc[$k]['params']      = array_merge($this->config['params'],$groupDocParam,$docParam,$result['param']);
				$this->doc[$k]['return']      = array_merge($this->config['return'],$groupDocReturn,$docReturn,$result['return']);

			}
		}

		$this->buildSettings();
		$data = [];
		foreach ($this->doc as $doc)
		{	
			if (empty($doc['requestUrl'])) {
				continue;
			}
			$key = md5($doc['requestUrl']);
			$data[$key] = [
				'name'   => $doc['methodName'],
				'selectedUrl' => $key,
				'url'    => $doc['requestUrl'],
				'method' => $doc['request'],
				'remark' => $doc['desc'],
				'postparam'   => $doc['params'],
				'returnparam' => $doc['return'],
			];
		}
		$jsonStr = json_encode($data);
		$jsonStr = str_replace("var","name",$jsonStr);
		$jsonStr = str_replace("about","memo",$jsonStr);
		Cache::set(self::SAVE_KEY,$jsonStr);
	}

	public function getClassMethodComment ($className,$classMethod)
	{
		$ref = new \ReflectionMethod($className, $classMethod);

		$comment = $ref->getDocComment();

		return $comment;
	}


	protected function buildClass ($rule)
	{
		if ($rule->groupNumber != -1) {
			$groupParams = $this->router->group->getParams($rule->groupNumber);
		} else {
			$groupParams = $this->router->group->getDefaultParams();
		}
		list($handle,$className,$module) = CurrecyHandle::buildClass($rule->handle,$rule,$groupParams);
		return ['class' => $className,'method' => $handle[1],'groupParams' => $groupParams];
	}

	protected function buildSettings ()
	{
		$config = [
			'name' => $this->config['name'],
			'navs' => [
				[
					'name' => '首页',
					'url'  => '#/index'
				]
			],
			'requestUrl'     => $this->config['request_url'],
			'requestUrlList' => [
				"read" =>  "/doc/read",
				"get"  => "/doc/get",
				"detail" => "/doc/detail"
			],
			'jsonFormatRead'        => $this->config['view']['json_format_read'],
			'accessTokenName'       => $this->config['rest_api_request']['access_token_name'],
			'accessTokenExpiryTime' => $this->config['rest_api_request']['access_token_expire_time'],
			"status" => [
				"success" => 0,
				"error" => 400,
				"notice" => 401,
				"access" => 403,
				"canfind" => 404,
				"fatal" => 500 
			]
		];
		return file_put_contents(__DIR__ . '/Resources/settings.json',json_encode($config));
	}
}