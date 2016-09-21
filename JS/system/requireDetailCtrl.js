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
            var url = 'employee/needInfo/' + _paras.id;
            _kit.ag(url,{},function (res) {
                $scope.employer = res.employer;
                $scope.need = res.need;
                $scope.need.first_dir = res.need.category.split('_')[0];
                $scope.need.second_dir = res.need.category.split('_')[1];
            })

            loadFinished();
        }
        $scope.now_in = function(){
            if(_stg.needSignin()){
                _kit.ap('employee/setFinished',{need_id:_paras.id},function(res){
                    $scope.need.person_state = '2';
                });
            }
        }

        $scope.now_out = function(){
            if(_stg.needSignin()){
                _kit.ap('employee/cancelFinished',{need_id:_paras.id},function(res){
                    $scope.need.person_state = '0';
                });
            }
            
        }

        $scope.closeNeed = function(){
            if(_stg.needSignin()){
                _kit.c('确定关闭需求，关闭后，编客不能再投稿。',function(action){
                    if(action){
                        _kit.ap('employer/cancelNeed',{need_id:_paras.id},function(res){
                            history.go(-1);
                        }); 
                    }
                });
            }
        }
        $scope.connectMe = function(){
            _kit.d('功能建设中。。。');
        }
        $scope.checkState = new checkState();
        $scope.file = new file_type();
        $scope.init();

        function loadFinished(){
            _kit.ag('employer/finishedList',{need_id:_paras.id},function(res){
                if(res.self){
                    $scope.g_finisheds = res.list;
                }else{
                    $scope.b_finisheds = res.list;
                }
            })
        }
     }]);


    function file_type(){
        return {
            zip:function(str){
                return /\.zip$/.test(str);
            }
            ,video:function(str){
                return /\.mp4$/.test(str);
            }
            ,name:function(str){
                var i = str.lastIndexOf('/');
                return str.substr(i+1);
            }
        }
    }

    function checkState(){
        return {
            join: function(need){
                if(!need) return !1;
                return (!need.person_state || need.person_state == '0') && need.status == '2';
            },
            out: function(need){
                if(!need) return !1;
                return (need.person_state && need.person_state == '2') && need.status == '2';
            },
            close:function(need){
                if(!need) return !1;
                return (need.person_state && need.person_state == '1') && need.status == '2'
            }
        };
    }
});