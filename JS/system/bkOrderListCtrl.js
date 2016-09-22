define(function (require) {
     'use strict';
     var app = require('../app');
     //加载 省市县 选择器
     require('angular-laypage');

     var _kit,_stg,_state,_form,_cuser,_dict;
     app.controller('bkOrderListCtrl',['$scope','$rootScope','Upload',function ($scope,$rootScope,Upload) {
        $rootScope.menu.menu_type = 2;
        $rootScope.menu.menu_index = 1;
        _kit = $scope._kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;

        var _page = $scope.page = {pageNumber:1,pageSize:6};
        $scope.state = 1;
        $scope.upload_modal = !1;
        _form = {};
        _stg.needSignin();

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
            _state.go('app.requireDetail',{id:id});
        }
         $scope.submit = function () {
            $scope.upload_modal = !0;
             //upload();
         };

        $scope.loadStateDate = function(state){
            $scope.state = state;
            _page.pageNumber = 1;
            loadData();
        }

        $scope.statusFun = function (order) {
            return {
                upload: order.status == '2' && order.upload_num <=0
                ,reupload: order.status == '2' && order.upload_num > 0 && order.upload_num < 3
                ,full_upload : order.status == '2' && order.upload_num >= 3 
            }
        }

        $scope.upload = function (order) {
            order.filename = order.videofile.name;
            _form.need_id = order.id;
            _form.videofile = order.videofile;
            upload(order);
        }

        $scope.init();
        /**
         * 加载各状态总数量
         */
        function loadStateCount(){
            _kit.ag('employee/stateCount',{},function(res){
                $scope.order_state = res;
            });
        }


        /**
         * 加载列表数据
         */
         function loadData(){
            var param = angular.extend(_page,{status:$scope.state||1});
            _kit.ag('employee/yeeOrderList',param,function(res){
                $scope.orderList = res.orderList;
                $scope.page =res.page;
                _kit.renderPage($scope.page,function(obj,first){
                    _page.pageNumber = obj.curr;
                    if(!first)loadData();
                })
            });
         }
         /**上传**/
         function upload(order) {
            _kit.apf('employee/uploadFinished',_form,function(res){
                _kit.s('上传成功');
            },function(){},function(){
                order.videofile = null;
            })
         }
     }]);
});