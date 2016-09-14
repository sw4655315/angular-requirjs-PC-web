define(function (require) {
     'use strict';
     var app = require('../app');
     var _kit,_stg,_state,_form,_gou;
     
     app.controller('registerCtrl',['$scope','$rootScope','$interval',function ($scope,$rootScope,$interval) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _state = $rootScope.$state;
        _form = $scope.loginForm = {};
        //查看密码
        $scope.showpwd = false;
        //注册方法
        $scope.signup = function(){
            var isPass = validInput();
            if(!isPass) return false;
            signup();
        }
        //获取验证码
        $scope.getCaptcha = function(){
            if(!_kit.reg.mobile.test(_form.mobile)){
                _kit.d('请输入正确手机号');
                return false;
            }
            _kit.ag('user/getCaptcha/register',_form,function (res) {
                _kit.s('验证码发送成功，请注意查收');
                //60秒倒计时
                $scope.countDown = 60;
                $interval(function(){
                    $scope.countDown-=1;
                },1000,60);
            });
        }
         _gou = $scope._gou = {
             tab_index:true
         }
     }]);

     function validInput () {
        var r = true;
        if(!_kit.reg.mobile.test(_form.mobile)){
            _kit.d('请输入正确手机号');
            r = false;
        }
        if(!_kit.reg.captcha.test(_form.captcha)){
            _kit.d('请输入正确验证码');
            r = false;
        }
        if(!_kit.reg.pwd.test(_form.password)){
            _kit.d('请输入正确密码');
            r = false;
        }
        return r;
     }
     function signup () {
        _kit.ap('user/signup',_form,function(res){
            _stg.add('sid',res.sessionid);
            _stg.add('user',res);
            _state.go('app.index');
        })
     }
});