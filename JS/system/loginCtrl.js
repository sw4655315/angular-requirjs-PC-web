define(function (require) {
     'use strict';
     var app = require('app');
     var _kit,_stg,_state;
     
     app.controller('loginCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        var accountSignin = $scope.accountSignin = true;
        var form = $scope.loginForm = {};
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _state = $rootScope.$state;
        //登录方法
        $scope.signin = function(){
            var isPass = validInput(form);
            if(!isPass) return false;
            signin(form);
        }
     }]);
     /**
      * 验证输入
      */
     function validInput (form) {
        var r = true;
          if(!_kit.reg.mobile.test(form.mobile)){
                _kit.d('请输入正确手机号');
                r = false;
          }
          if(!_kit.reg.pwd.test(form.password)){
                _kit.d('请输入正确密码');
                r = false;
          }
          return r;
     }
     /**
      * 登录操作
      */
     function signin (form) {
        _kit.ap('user/signin',form,function(res){
            _stg.add('sid',res.sessionid);
            _stg.add('user',res);
            _state.go('app.index');
        })
     }
});