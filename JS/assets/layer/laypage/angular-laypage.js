var attrs = {};
define(function (require) {
     'use strict';
     var app = require('app');
     app.directive('ngLaypage', function($timeout) {
            return {
                //require: '?ngModel',
                restrict: 'A',
                scope: {
                    cont  : '@',        //容器。值支持id名、原生dom对象，jquery对象,
                    pages : '@',        //总页数
                    curr  : '@',        //当前页
                    groups: '@',        //连续显示分页数
                    first : '@',
                    last  : '@',
                    prev  : '@',
                    next  : '@'
                },
                link: function(scope, element, attr) {
                    var _config={};
                    attrs = attr;
                    console.log(attr);
                     // 渲染模板完成后执行
                    $timeout(function(){ 
                        // 初始化参数 
                        _config = {
                            cont: '#' + attr.id,
                            pages: attrs.pages || !1 ,
                            curr: +attr.curr || !1,
                            groups: +attr.groups || !1,
                            first: +attr.first || !1,
                            last: +attr.last || !1,
                            prev: attr.prev || '<',
                            next: attr.next || '>'
                        };
                        console.log(_config);
                        // 初始化
                        laypage(_config);
                    },0);  
                }
            };
        })

     
});