define(function (require) {
    'use strict';
    var app = require('app');
    var _kit,_stg,_state,_form,_cuser;

    require('angular-select-address');
    app.useModule('selectAddress');

    app.controller('userInfoCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.menu.menu_type = 2;
        $rootScope.menu.menu_index = 2;
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _stg.needSignin();
        _state = $rootScope.$state;
        _cuser = $scope.cuser = _stg.user();
        _form = $scope._form = {
            nickname:_cuser.nickname,
            sex : _cuser.sex,
            summary:_cuser.summary
        };

        function init(){
            if(!_kit.isEmpty(_cuser.city)){
                $scope.p = _cuser.city.split(' - ')[0] || '北京';
                $scope.c = _cuser.city.split(' - ')[1];
                $scope.a = _cuser.city.split(' - ')[2];
            }
        }

        $scope.commit = function(){
            _kit.apf('user/complete',_form,function(res){
                _cuser = $scope.cuser = res;
                _stg.set("user",_cuser);
                _kit.s('修改成功');
            })
        }

        init();
    }]);

});