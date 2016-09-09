define(function (require) {
     'use strict';
     /**
      * 发布需求页
      */
     var app = require('../app');
     var _kit,_stg,_state,_form,_dict;
     require('angular-laydate');
     app.controller('requireDeployCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $scope.deploy_step=1;
        _kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;
        _form = $scope._form = {};
        /**
         * 到第二步
         */
         $scope.go_step_2 = function(first_dir,second_dir){
            $scope.deploy_step = 2;
            _form.first_dir = first_dir;
            _form.second_dir = second_dir;
            _form.category = first_dir + "_" + second_dir;
         }

         /**
         * 到第三步
         */
         $scope.go_step_3 = function(){
            if(_kit.isEmpty(_form.title) || _kit.isEmpty(_form.summary)){
                _kit.d('请描述您的需求');
                return false;
            }
            $scope.deploy_step = 3;
         }

         /**
         * 到第四步
         */
         $scope.go_step_4 = function(){
            if(!_kit.reg.reward_rmb.test(_form.reward_rmb)){
                _kit.d('请输入>100的金额');
                return false;
            }
            if(_kit.isEmpty(_form.deadline_time)){
                _kit.d('请选择截至日期');
                return false;
            }
            $scope.deploy_step = 4;
         }
         /**
         * 确认发布需求
         */
         $scope.deploy_confirm = function(){
            var agree_rule = document.getElementById('agree_rule');
            if(!agree_rule.checked){
                _kit.d('请阅读并同意发布守则');
                return false;
            }
            _kit.ap('employer/deployNeed',_form,function(res){
                _state.go('app.requireDetail',{id:res.id});
            });
         }
     }]);
});