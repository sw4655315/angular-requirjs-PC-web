define(function (require) {
     'use strict';
     var app = require('../app');
     //加载 省市县 选择器
     require('angular-laypage');

     var _kit,_stg,_state,_form,_cuser,_dict;
     app.controller('personOrderListCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.menu.menu_type = 2;
        $rootScope.menu.menu_index = 1;
        _kit = $scope._kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;
        _stg.needSignin();
        var _page = $scope.page = {pageNumber:1,pageSize:6};
        $scope.state = 1;
        $scope.init = function () {
            _cuser = _stg.user();
            if(!_kit.isExist(_cuser)){
                _state.go('login');
                return !1;
            }
            loadStateCount();
            loadData();
        }
        $scope.go_detail = function (id,userids) {
            _state.go('app.requireDetail',{id:id,userids:userids});
        }

        $scope.loadStateDate = function(state){
            $scope.state = state;
            _page.pageNumber = 1;
            loadData();
        }

        $scope.init();
        /**
         * 加载各状态总数量
         */
        function loadStateCount(){
            _kit.ag('Employer/stateCount',{},function(res){
                $scope.order_state = res;
            });
        }


        /**
         * 加载列表数据
         */
         function loadData(){
            var param = angular.extend(_page,{orderType:$scope.state||1});
            _kit.ag('Employer/orderList',param,function(res){
                $scope.orderList = res.orderList;
                $scope.page =res.page;
                _kit.renderPage($scope.page,function(obj,first){
                    _page.pageNumber = obj.curr;
                    if(!first)loadData();
                })
            });
         }
     }]);
});