define(function (require) {
     'use strict';
     /**
      * 需求详情页
      */
     var app = require('app');
     var _kit,_stg,_state,_dict,_paras,_cuser;
     app.controller('requireDetailCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.menu.menu_type = 1;
        $rootScope.menu.menu_index = 2;
        _kit = $scope._kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $scope._state = $rootScope.$state;
        _paras = $scope._paras = $rootScope.$stateParams;
        _cuser = $scope.cuser = _stg.user();
        /**
         * 初始化加载
         */
        $scope.init = function () {
            if(_kit.isEmpty(_paras.id)){
                _kit.d('页面加载失败');
                return false;
            }
            var url = 'Employee/needInfo/' + _paras.id;
            _kit.ag(url,{},function (res) {
                $scope.employer = res.employer;
                $scope.need = res.need;
                $scope.need.first_dir = res.need.category.split('_')[0];
                $scope.need.second_dir = res.need.category.split('_')[1];
            })
        }
        $scope.now_in = function(){
            if(_stg.needSignin()){
                _kit.ap('Employee/setFinished',{need_id:_paras.id},function(res){
                    $scope.need.person_state = '2';
                });
            }
        }

        $scope.now_out = function(){
            if(_stg.needSignin()){
                _kit.ap('Employee/cancelFinished',{need_id:_paras.id},function(res){
                    $scope.need.person_state = '0';
                });
            }
            
        }

        $scope.closeNeed = function(){
            if(_stg.needSignin()){
                _kit.c('确认要关闭需求吗？关闭不可恢复！',function(action){
                    if(action){
                        _kit.ap('Employer/cancelNeed',{need_id:_paras.id},function(res){
                            history.go(-1);
                        }); 
                    }
                });
            }
        }
        $scope.init();
     }]);
});