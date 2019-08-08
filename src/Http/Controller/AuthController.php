<?php

namespace RestDoc\Http\Controller;

use RestDoc\ApiDocument;
use Concise\Http\Request;

class AuthController
{
	public function index ()
	{
		return ApiDocument::render('auth');
	}

	public function auth (Request $request)
	{
		return ApiDocument::auth($request->password) ? redirect(route('restdoc.index')) : back()->withMessage('认证错误');
	}
}