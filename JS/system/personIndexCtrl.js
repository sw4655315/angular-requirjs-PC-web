define(function (require) {
     'use strict';
     var app = require('../app');
     //加载 省市县 选择器
     require('angular-select-address');
     app.useModule('selectAddress');
     var _kit,_stg,_state,_paras,_form,_cuser;
     app.controller('personIndexCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        _kit = $scope._kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _state = $rootScope.$state;
        _paras = $rootScope.$stateParams;
        _form = $scope._form = {};
        $scope.init = function () {
            _cuser = _stg.user();
            if(!_kit.isExist(_cuser)){
                _state.go('login');
                return false;
            }
            $scope.cuser = _cuser;
            $scope.step = _cuser.audit >= 2?(1+_cuser.audit):1;
            if(!_kit.isEmpty(_cuser.city)){
                $scope.p = _cuser.city.split(' - ')[0] || '北京';
                $scope.c = _cuser.city.split(' - ')[1];
                $scope.a = _cuser.city.split(' - ')[2];
            }
        }

        /**
         * 第二步
         */ 
        $scope.go_step_2 = function(){
            _kit.ap('user/complete',_cuser,function (res) {
                $scope.step = 2;
                _str.set('user',res);
            });
        }
        /**
         * 第三步
         */
        $scope.go_step_3 = function(){
            var url = 'user/approve/' + (_cuser.type == 1?'personal':'company');
            _kit.ap(url,_form,function (res) {
                //保存审核状态
                $scope.step = 3;
            });
        }

        $scope.init();
     }]);
});