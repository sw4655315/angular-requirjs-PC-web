define(function (require) {
     'use strict';
     /**
      * 发布需求页
      */
     var app = require('../app');
     var _kit,_stg,_state,_form,_dict,_leftTab;
     require('angular-laydate');
     app.controller('requireDeployCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.menu.menu_type = 1;
        $rootScope.menu.menu_index = 2;
        $scope.deploy_step=1;
        _kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _stg.needSignin(1); //判断是否已登录
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;
        _form = $scope._form = {max_contribution:3,pledge_rmb:0};
        $scope.min_date = laydate.now(7);

         _leftTab = $scope._leftTab = {
             tab_index:1
         }
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
            if(_kit.isEmpty(_form.title) || _kit.isEmpty(_form.summary_tight)){
                _kit.d('请描述您的需求');
                return false;
            }
            _form.summary = _form.summary_tight.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
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
            _kit.apf('employer/deployNeed',_form,function(res){
                //_state.go('app.requireDetail',{id:res});
                $scope.deploy_step = 5;
                _form.id = res;
            });
         }

         $scope.deploy_finish = function(){
            _state.go('app.requireDetail',{id:_form.id,userids:_stg.user().ids});
         }


         $scope.log = function(){
            console.log(_form.files);
         }
     }]);
});