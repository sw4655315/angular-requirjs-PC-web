define(function (require) {
    'use strict';
    var app = require('app');
    var _kit,_stg,_state,_form,_dict;
    app.controller('allRequiresCtrl',['$scope','$rootScope',function ($scope,$rootScope,$interval) {
        $rootScope.menu.menu_type = 1;
        $rootScope.menu.menu_index = 2;
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _dict = $scope._dict =  app.get('$dict');
        _state = $rootScope.$state;
        _form = $scope._form = {pageNumber:1,pageSize:10,key_word:$rootScope._search.key_word};
        $scope.unescapeHtml = unescapeHtml;
        $scope.markSearchWord = markSearchWord;

        $scope.init = function(){
            loadData();
        }

        $scope.go_detail = function(id,userids){
            _state.go('app.requireDetail',{id:id,userids:userids});
        }

        $scope.init();

        $scope.$on('load_allRequires_date',loadData);
        function loadData(){
            _form.key_word = $rootScope._search.key_word;
            _kit.ag('index/orderList',_form,function(res){
                $scope.page = res.page;
                $scope.orderList = res.orderList;
                _kit.renderPage(res.page,function(obj, first){
                    _form.pageNumber = obj.curr;
                    if(!first) loadData();
                });
            })
        }

        /**
         * 转义html，去掉html标签字符
         */
        function unescapeHtml (str) {
             return str.replace(/<br>/g, '').replace(/&nbsp;/g, '');
        }

        function markSearchWord (str) {
             var reg = eval('/' + $rootScope._search.key_word + '/g');
             var res = str.replace(reg, '<b class="mark_search">' + $rootScope._search.key_word + '</b>');
             return res;
        }

    }]);




});