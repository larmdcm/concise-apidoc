<?php

namespace RestDoc\Http\Middleware;

use Concise\Http\Request;
use RestDoc\ApiDocument;

class Authenticate
{
	public function handle (Request $request,\Closure $next = null)
	{
		$config = ApiDocument::getConfig();
		$auth   = isset($config['auth']) ? $config['auth'] : [];

		if (isset($auth['open']) && $auth['open']) {
			if (!ApiDocument::auth()) {
				return redirect(route('restdoc.auth'));
			}
		}
		return $next($request);
	}
}