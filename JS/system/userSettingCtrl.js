define(function (require) {
    'use strict';
    var app = require('app');
    var _kit,_stg,_state,_form,_cuser,_editable;

    app.controller('userSettingCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.menu.menu_type = 2;
        $rootScope.menu.menu_index = 2;
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _stg.needSignin();
        _state = $rootScope.$state;
        _cuser = $scope.cuser = _stg.user();;
        _form = $scope._form = {opwd:'',npwd:'',cnpwd:''};
        _editable = $scope._editable = {
            edit:false
        }

        $scope.savePassword = function(){
            if(!_kit.reg.pwd.test(_form.opwd)
                || !_kit.reg.pwd.test(_form.npwd)
                || !_kit.reg.pwd.test(_form.cnpwd)){
                _kit.d('密码格式错误');
                return !1;
            }
            if(_form.npwd != _form.cnpwd){
                _kit.d('两次输入密码不一致！');
                return !1;
            }
            _kit.ap('user/modifyPassword',_form,function(res){
                _kit.s('密码修改成功');
                $scope._form = {opwd:'',npwd:'',cnpwd:''};
                _editable.edit = false;
            })
        }
    }]);

});