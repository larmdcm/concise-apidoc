"use strict"; // 缓存类

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cache =
/*#__PURE__*/
function () {
  function Cache() {
    _classCallCheck(this, Cache);

    this.data = {};
  }

  _createClass(Cache, [{
    key: "get",
    value: function get() {
      return this.data;
    }
  }, {
    key: "set",
    value: function set(key, val) {
      if (key.includes('.')) {
        var keys = key.split('.');
        keys.length > 1 ? this.data[keys[0]] ? this.data[keys[0]][keys[1]] = val : this.__setData(keys, val) : this.data[keys[0]] = val;
      } else {
        this.data[key] = val;
      }

      return this;
    }
  }, {
    key: "__setData",
    value: function __setData(keys, val) {
      this.data[keys[0]] = {};
      this.data[keys[0]][keys[1]] = val;
    }
  }, {
    key: "read",
    value: function read(key) {
      if (key.includes('.')) {
        var keys = key.split('.');
        return keys.length > 1 ? this.exists(this.data[keys[0]][keys[1]]) ? this.data[keys[0]][keys[1]] : '' : this.exists(this.data[keys[0]]) ? this.data[keys[0]] : '';
      }

      return this.exists(this.data[key]) ? this.data[key] : '';
    }
  }, {
    key: "clear",
    value: function clear() {
      this.data = {};
    }
  }, {
    key: "count",
    value: function count() {
      return this.data.lenght;
    }
  }, {
    key: "has",
    value: function has(key) {
      if (key.includes('.')) {
        var keys = key.split('.'),
            val = keys.length > 1 ? this.data[keys[0]] ? this.data[keys[0]][keys[1]] : this.__hasData(keys) : this.data[keys[0]];
        return !mce.toolFn.isEmpty(val) ? true : false;
      }

      return !mce.toolFn.isEmpty(this.data[key]) ? true : false;
    }
  }, {
    key: "__hasData",
    value: function __hasData(keys) {
      this.data[keys[0]] = {};
      return this.data[keys[0]][keys[1]];
    }
  }, {
    key: "exists",
    value: function exists(value) {
      return !mce.toolFn.isEmpty(value) ? true : false;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      if (key.includes('.')) {
        var keys = key.split('.');
        keys.length > 1 ? delete this.data[keys[0]][keys[1]] : delete this.data[keys[0]];
      } else {
        delete this.data[key];
      }

      return this;
    }
  }]);

  return Cache;
}();

var $class;

for (var _i = 0, _arr = ['Cache']; _i < _arr.length; _i++) {
  $class = _arr[_i];
  window[mce.toolFn.firstToLower($class)] = createClass($class);
} // create Class


function createClass($class) {
  return window[mce.toolFn.firstToLower($class)] ? window[mce.toolFn.firstToLower($class)] : eval('new ' + $class + '()');
} // 获取参数


function getParams(el) {
  var params = [],
      paramOnce = {},
      element = mce.toolFn.isString(el) ? $(el) : mce.toolFn.getElement(el);
  element.find('tbody').eq(0).find('tr').each(function () {
    $(this).find('td').each(function () {
      var once = $(this).children().eq(0);
      once.attr('name') ? paramOnce[once.attr('name')] = once.val() || once.text() : '';
    });
    params.push(paramOnce);
    paramOnce = {};
  });
  return params;
} // 获取请求url


function getRequstUrl(name) {
  // return apiConfig['requestUrl'] + apiConfig['requestUrlList'][name];
  return apiConfig['requestUrlList'][name];
} // 获取状态码


function getStatus(status) {
  return apiConfig['status'][status];
}

function inObjectVal(object, val) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'name';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = object[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      v = _step.value;
      if (v[key] == val) return true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
} // 格式化JSON源码(对象转换为JSON文本)


function jsonFormat(txt, compress) {
  var indentChar = '    ';

  if (/^\s*$/.test(txt)) {
    alert('返回数据为空,无法格式化! ');
    return "";
  }

  try {
    var data = eval('(' + txt + ')');
  } catch (e) {
    alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
    return;
  }

  ;
  var draw = [],
      last = false,
      This = this,
      line = compress ? '' : '\n',
      nodeCount = 0,
      maxDepth = 0;

  var notify = function notify(name, value, isLast, indent
  /*缩进*/
  , formObj) {
    nodeCount++;
    /*节点计数*/

    for (var i = 0, tab = ''; i < indent; i++) {
      tab += indentChar;
    }
    /* 缩进HTML */


    tab = compress ? '' : tab;
    /*压缩模式忽略缩进*/

    maxDepth = ++indent;
    /*缩进递增并记录*/

    if (value && value.constructor == Array) {
      /*处理数组*/
      draw.push(tab + (formObj ? '"' + name + '":' : '') + '[' + line);
      /*缩进'[' 然后换行*/

      for (var i = 0; i < value.length; i++) {
        notify(i, value[i], i == value.length - 1, indent, false);
      }

      draw.push(tab + ']' + (isLast ? line : ',' + line));
      /*缩进']'换行,若非尾元素则添加逗号*/
    } else if (value && _typeof(value) == 'object') {
      /*处理对象*/
      draw.push(tab + (formObj ? '"' + name + '":' : '') + '{' + line);
      /*缩进'{' 然后换行*/

      var len = 0,
          i = 0;

      for (var key in value) {
        len++;
      }

      for (var key in value) {
        notify(key, value[key], ++i == len, indent, true);
      }

      draw.push(tab + '}' + (isLast ? line : ',' + line));
      /*缩进'}'换行,若非尾元素则添加逗号*/
    } else {
      if (typeof value == 'string') value = '"' + value + '"';
      draw.push(tab + (formObj ? '"' + name + '":' : '') + value + (isLast ? '' : ',') + line);
    }

    ;
  };

  var isLast = true,
      indent = 0;
  notify('', data, isLast, indent, false);
  return draw.join('');
}

if (typeof Vue != 'undefined') {
  Vue.$http = {
    post: function post(url, data) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (response) {
        response.code == getStatus('success') ? dialog.success(response.msg, apiConfig['name']) : dialog.error(response.msg, apiConfig['name']);
      };
      var dataType = arguments.length > 3 ? arguments[3] : undefined;
      return this.send(url, callback, data, 'post', true, dataType);
    },
    getJSON: function getJSON() {
      return this.send.apply(this, arguments);
    },
    send: function send(url) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'post';
      var async = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var dataType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'json';
      $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,
        async: async,
        success: function success(response) {
          if (callback != null) return callback(response);
          console.log(response);
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          layer.closeAll();
          var message = 'Status:' + XMLHttpRequest.status + ' readyState:' + XMLHttpRequest.readyState + ' error:' + textStatus;
          throw new Error(message);
        }
      });
    }
  };
}