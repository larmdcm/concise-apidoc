"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  // 导航栏组件
  var navbar = {
    template: "\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"navbar-header\">\n\t\t      \t\t\t<a class=\"navbar-brand\" href=\"javascript:;\">{{ name }}</a>\n\t\t      \t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n\t\t\t\t\t\t\t<span class=\"sr-only\">\u5207\u6362\u5BFC\u822A</span>\n\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t    </div>\n\t\t\t\t    <div class=\"collapse navbar-collapse navbar-let\" id=\"navbar-collapse\">\n\t\t\t\t\t    <ul class=\"nav navbar-nav\">\n\t\t\t\t\t    \t <li v-for=\"item in listData\" :data-url=\"item.dataUrl\">\n\t\t\t\t\t\t    \t <a :href=\"item.url\">{{ item.name }}</a>\n\t\t\t\t\t    \t </li>\n\t\t\t\t\t    </ul>\n\t\t\t\t    </div>\n\t\t\t\t</div>\n\t\t",
    props: ['name', 'lists'],
    computed: {
      listData: function listData() {
        for (var i in this.lists) {
          this.lists[i].dataUrl = this.lists[i].url.substr(2);
        }

        return this.lists;
      }
    } // table创建组件

  },
      tableCreate = {
    template: "<div class=\"col-sm-12\">\n\t\t\t<div class=\"content\">\n\t\t\t\t<label class=\"control-label\">{{ title }}: \n\t\t\t\t\t<a href=\"javascript:;\" @click=\"create()\" v-if=\"type == 'params' || type == 'return'\">+\u65B0\u589E\u53C2\u6570</a>\n\t\t\t\t\t<a href=\"javascript:;\" @click=\"showback()\" v-else>\u663E\u793A\u9690\u85CF</a>\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<div class=\"table-responsive content\">\n\t\t\t\t\t\t<table class=\"table table-striped table-bordered table-hover table-condensed\" v-show=\"isShow\">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th v-for=\"item in thead\">{{ item }}</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<template v-if=\"type == 'params'\">\n\t\t\t\t\t\t\t\t<tr-params :tbody=\"tbody\"></tr-params>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<template v-if=\"type == 'return'\">\n\t\t\t\t\t\t\t\t<tr-return :tbody=\"tbody\"></tr-return>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<template v-if=\"type == 'readParams'\">\n\t\t\t\t\t\t\t\t<tr-read-params :tbody=\"tbody\"></tr-read-params>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<template v-if=\"type == 'readReturn'\">\n\t\t\t\t\t\t\t\t<tr-read-return :tbody=\"tbody\"></tr-read-return>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t",
    props: ['thead', 'tbody', 'type'],
    data: function data() {
      return {
        isShow: true
      };
    },
    methods: {
      create: function create() {
        var createType = this.type == 'params' ? '#postparam' : '#returnparam',
            params = getParams(createType),
            k,
            v;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = params.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            k = _step$value[0];
            v = _step$value[1];
            this.tbody[k] = params[k];
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

        this.tbody.push({
          name: '',
          type: '',
          is_need: 1,
          memo: '',
          default: ''
        });
      },
      remove: function remove(index) {
        var createType = this.type == 'params' ? '#postparam' : '#returnparam',
            params = getParams(createType),
            k,
            v;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = params.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2);

            k = _step2$value[0];
            v = _step2$value[1];
            this.tbody[k] = params[k];
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.tbody.splice(index, 1);
      },
      showback: function showback() {
        this.isShow = !this.isShow;
      },
      changeParams: function changeParams() {
        app.$emit("changeParams", getParams('#postparam'));
      }
    },
    computed: {
      title: function title() {
        var title = '';

        switch (this.type) {
          case 'params':
            title = '请求';
            break;

          case 'return':
            title = '返回';
            break;

          case 'readParams':
            title = '参数说明';
            break;

          case 'readReturn':
            title = '返回说明';
        }

        return title;
      }
    },
    components: {
      "tr-params": {
        template: "\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr v-for=\"(item,index) in tbody\">\n\t\t\t\t\t\t<td><input type=\"text\" :value=\"item.name\" class=\"form-control\" name=\"name\"/></td>\n\t\t\t\t\t\t<td><input type=\"text\" :value=\"item.type\" class=\"form-control\" name=\"type\"/></td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<select class=\"form-control\" name=\"is_need\">\n\t\t\t\t\t\t\t\t<template v-for=\"(v,k) in ['\u5426','\u662F']\">\n\t\t\t\t\t\t\t\t\t<option :value=\"k\" v-if=\"k == item.is_need\" selected=\"selected\">{{ v }}</option>\n\t\t\t\t\t\t\t\t\t<option :value=\"k\" v-else>{{ v }}</option>\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td><input type=\"text\" :value=\"item.memo\" class=\"form-control\" name=\"memo\"/></td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<input type=\"text\" :value=\"item.default\" class=\"form-control\" name=\"default\"/>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td class=\"text-center\">\n\t\t\t\t\t\t\t<input @click=\"$parent.remove(index)\" type=\"button\" value=\"\u5220\u9664\" class=\"btn btn-danger btn-xs\"/>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t\t",
        props: ['tbody']
      },
      "tr-return": {
        template: "\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr v-for=\"(item,index) in tbody\">\n\t\t\t\t\t\t<td><input type=\"text\" :value=\"item.name\" class=\"form-control\" name=\"name\"/></td>\n\t\t\t\t\t\t<td><input type=\"text\" :value=\"item.type\" class=\"form-control\" name=\"type\"/></td>\n\t\t\t\t\t\t<td><input type=\"text\" :value=\"item.memo\" class=\"form-control\" name=\"memo\"/></td>\n\t\t\t\t\t\t<td class=\"text-center\">\n\t\t\t\t\t\t\t<input @click=\"$parent.remove(index)\" type=\"button\" value=\"\u5220\u9664\" class=\"btn btn-danger btn-xs\"/>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t  \t",
        props: ['tbody']
      },
      "tr-read-params": {
        template: "\n\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr v-for=\"item in tbody\">\n\t\t\t\t\t\t\t<td><span name=\"name\">{{ item.name }}</span></td>\n\t\t\t\t\t\t\t<td>{{ item.type }}</td>\n\t\t\t\t\t\t\t<td>{{ item.is_need }}</td>\n\t\t\t\t\t\t\t<td>{{ item.memo }}</td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<input type=\"text\" :value=\"item.default\" name=\"default\" class=\"form-control\" @keyup=\"$parent.changeParams\"/>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t  \t ",
        props: ['tbody']
      },
      "tr-read-return": {
        template: "\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr v-for=\"item in tbody\">\n\t\t\t\t\t\t\t<td>{{ item.name }}</td>\n\t\t\t\t\t\t\t<td>{{ item.type }}</td>\n\t\t\t\t\t\t\t<td>{{ item.memo }}</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody>\n\t\t  \t",
        props: ['tbody']
      }
    }
  },
      // 接口select选择组件
  interfaceSelectList = {
    template: "\n\t\t\t\t<select v-model=\"selected\" @change=\"selectChange\" name=\"iterface\" class=\"form-control selectpicker show-tick\" id=\"interfaceSelect\" data-live-search=\"true\">\n\t\t\t\t\t <template v-if=\"type == 'add'\">\n\t\t\t\t\t\t<option value=\"add\" selected=\"selected\">\u65B0\u589E\u63A5\u53E3</option>\n\t\t\t\t\t </template>\n\t\t\t\t\t <template v-for=\"(item,index) in iters\">\n\t\t\t\t\t\t <option v-if=\"type != 'add' && index == 0\" :value=\"item.url\" selected=\"selected\">{{index + 1}}-{{ item.name }}</option>\n\t\t\t\t\t\t <option :value=\"item.url\" v-else>{{index + 1}}-{{ item.name }}</option>\n\t\t\t\t\t </template>\n\t\t\t\t</select>\n\t\t",
    props: ['type'],
    data: function data() {
      return {
        iters: [],
        selected: this.type
      };
    },
    created: function created() {
      var vm = this,
          callback = function callback(response) {
        if (response.code == getStatus('success')) {
          cache.set("readIterList", response);
          var k, v;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = response.data.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _step3$value = _slicedToArray(_step3.value, 2);

              k = _step3$value[0];
              v = _step3$value[1];
              vm.$set(vm.iters, k, v);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        } else {
          dialog.error(response.msg, apiConfig['name']);
        }

        setTimeout(function () {
          $('#interfaceSelect').selectpicker('refresh');
          app.$emit("changeUrl", vm.selected == 'read' ? response.data[0] ? response.data[0].url : '' : vm.selected);
        }, 1);
      };

      cache.has("readIterList") ? callback(cache.read("readIterList")) : Vue.$http.post(getRequstUrl('read'), {}, callback);
    },
    methods: {
      selectChange: function selectChange() {
        app.$emit("changeUrl", this.selected);
      }
    },
    mounted: function mounted() {
      var vm = this;
      setTimeout(function () {
        app.$on("changeIterUrl", function (k, iterData, keyName) {
          var key = "iterList." + k,
              iterDatas = cache.read("readIterList");

          if (k == 'add') {
            cache.set("iterList." + keyName, {
              data: iterData
            });
            vm.iters.push({
              url: keyName,
              name: iterData.name
            });
            iterDatas.data.push({
              url: keyName,
              name: iterData.name
            });
          } else {
            cache.set(key, {
              data: iterData
            });
            vm.iters.forEach(function (v, index) {
              if (v.url == k) {
                vm.iters[index]['name'] = iterData.name;
                iterDatas.data[index]['name'] = iterData.name;
              }
            });
          }

          cache.set("readIterList", iterDatas);
          setTimeout(function () {
            $('#interfaceSelect').selectpicker('refresh');
          }, 1);
        });
      }, 1);
    }
  };
  window.components = {
    navbar: navbar,
    tableCreate: tableCreate,
    interfaceSelectList: interfaceSelectList
  };
})();