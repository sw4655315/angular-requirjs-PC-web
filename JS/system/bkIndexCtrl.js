define(function (require) {
     'use strict';
     var app = require('../app');
     //加载 省市县 选择器
     require('angular-select-address');
     app.useModule('selectAddress');

     require('angular-laydate');


     var _kit,_stg,_state,_paras,_form,_cuser,_dict,_nickname;
     app.controller('bkIndexCtrl',['$scope','$rootScope',function ($scope,$rootScope,Upload) {
        $rootScope.menu.menu_type = 2;
        $rootScope.menu.menu_index = 1;
        _kit = $scope._kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;
        _paras = $rootScope.$stateParams;
        _stg.needSignin();
        _form = $scope._form = {
            photo:null
        };
        $scope.init = function () {
            _cuser = _stg.user();
            if(!_kit.isExist(_cuser)){
                _state.go('login');
                return !1;
            }
            //默认初始化为个人用户
            if(_kit.isEmpty(_cuser.type)) _cuser.type = 1;
            $scope.cuser = _cuser;
            _nickname = $scope.nickname = _cuser.nickname;
            var audit = parseInt(_cuser.audit);
            $rootScope.user_bk_index_step = $scope.step = audit >= 2?(1+audit):1;
            if(!_kit.isEmpty(_cuser.city)){
                $scope.p = _cuser.city.split(' - ')[0] || '北京';
                $scope.c = _cuser.city.split(' - ')[1];
                $scope.a = _cuser.city.split(' - ')[2];
            }
        }

        /**
         * 第二步
         */ 
        $scope.go_prev = function(step){
            $rootScope.user_bk_index_step = $scope.step = step;
        }

        /**
         * 第二步
         */ 
        $scope.go_step_2 = function(){
            if(!validatePerson()) return !1;
            _kit.apf('user/complete',_cuser,function (res) {
                $rootScope.user_bk_index_step = $scope.step = 2;
                //修改后的用户信息，放到缓存中
                refreshCacheUser();
            });
        }
        /**
         * 第三步
         */
        $scope.go_step_3 = function(){
            _form.type = _cuser.type;
            //验证输入
            if(!validateApprove()) return !1;
            var url = 'user/approve/' + (_cuser.type == 1?'personal':'company');
            _kit.apf(url,_form,function(res){
                //上传成功，保存状态
                _cuser.audit = 2;
                $rootScope.user_bk_index_step = $scope.step = 3;
                refreshCacheUser();
            })
        }

        $scope.reApply = function () {
            _kit.ap('user/approve/refresh/'+_cuser.ids,{},function (res) {
                _cuser.audit = 1;
                refreshCacheUser();
                $rootScope.user_bk_index_step = $scope.step = 1;
            })
        }

        $scope.init();
     }]);
    /**
     * 验证个人信息完善
     */
    function validatePerson () {
        if(_kit.isEmpty(_cuser.nickname)){
            _kit.d('请输入昵称');
            return !1;
        }
        if(!_kit.reg.mobile.test(_cuser.mobile)){
            _kit.d('请输入正确手机号');
            return !1;
        }
        if(_kit.isEmpty(_cuser.city)){
            _kit.d('请选择所在城市');
            return !1;
        }
        return !0;
    }

    /**
     * 验证用户认证输入
     */
    function validateApprove () {
        if(_form.type == 1){
            if(!_kit.reg.real_name.test(_form.name)){
                _kit.d('请输入正确的中文名称');
                return !1;
            }
            if(!_kit.reg.id_card.test(_form.id_card)){
                _kit.d('请输入正确的身份证号');
                return !1;
            }
        }else{
            if(_kit.isEmpty(_form.name)){
                _kit.d('请输入企业名称');
                return !1;
            }
            if(_kit.isEmpty(_form.id_card)){
                _kit.d('请输入营业执照注册号');
                return !1;
            }
        }
        if(_kit.isEmpty(_form.photo)){
            _kit.d('请选择图片文件');
            return !1;
        }
        return !0;
    }
    function refreshCacheUser () {
        _nickname = _cuser.nickname;
        _stg.set('user',_cuser);
    }
});