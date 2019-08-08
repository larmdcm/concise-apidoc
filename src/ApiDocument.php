<?php

namespace RestDoc;

use Concise\Container\Container;

class ApiDocument
{
	protected static $instance;

	public static function __callStatic ($method,$params)
	{
		if (!is_object(static::$instance)) {
			static::$instance = Container::exists('restDoc') ? Container::get('restDoc') : (new Repository());
		}
		return call_user_func_array([static::$instance,$method], $params);
	}
}