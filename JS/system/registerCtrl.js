define(function (require) {
     'use strict';
     var app = require('../app');
     
     app.controller('registerCtrl',['$scope','$rootScope','$interval',function ($scope,$rootScope,$interval) {
        var $kit = app.get('$kit');
        //查看密码
        $scope.showpwd = false;
        //注册方法
        $scope.signup = function(){
            var isPass = validInput($scope.loginForm,$kit);
            if(!isPass) return false;
            signup($scope.loginForm,$kit,$rootScope.$state);
        }
        //获取验证码
        $scope.getCaptcha = function(){
            if(!$kit.reg.mobile.test($scope.loginForm.mobile)){
                $kit.d('请输入正确手机号');
                return false;
            }
            $kit.ag('user/getCaptcha/register',$scope.loginForm,function (res) {
                $kit.s('验证码发送成功，请注意查收');
                //60秒倒计时
                $scope.countDown = 60;
                $interval(function(){
                    $scope.countDown-=1;
                },1000,60);
            });
        }
     }]);

     function validInput (form,$kit) {
        var r = true;
        if(!$kit.reg.mobile.test(form.mobile)){
            $kit.d('请输入正确手机号');
            r = false;
        }
        if(!$kit.reg.captcha.test(form.captcha)){
            $kit.d('请输入正确验证码');
            r = false;
        }
        if(!$kit.reg.pwd.test(form.password)){
            $kit.d('请输入正确密码');
            r = false;
        }
        return r;
     }
     function signup (form,$kit,state) {
        $kit.ap('user/signup',form,function(res){
            $kit.stg.add('sid',res.sessionid);
            $kit.stg.add('user',res);
            state.go('app.index');
        })
     }
});