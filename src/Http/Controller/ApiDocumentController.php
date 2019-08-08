<?php

namespace RestDoc\Http\Controller;

use RestDoc\ApiDocument;
use Concise\Foundation\Config;

class ApiDocumentController
{
	public function index ()
	{
		$isBuildRoute = Config::scope('doc')->get('build_doc_route',false);
		if ($isBuildRoute) {
			ApiDocument::bind(container('router'))->build();
		}
		return ApiDocument::render();
	}
	
	public function home ()
	{
		return ApiDocument::render('index');
	}

	public function read ()
	{
		return ApiDocument::read();
	}

	public function get ()
	{
		return ApiDocument::get();
	}

	public function detail ()
	{
		return ApiDocument::detail();
	}
}