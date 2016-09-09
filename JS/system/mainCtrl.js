define(function (require) {
     'use strict';
     var app = require('../app');
     var _kit
        ,_stg
        ,_state
        ,_search;
     app.controller('mainCtrl',['$scope','$state',function ($scope,$state) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _state = $state;
        //tab_index
        //1:需求
        //2:素材
        //3:编客
        _search = $scope._search = {
            tab_index:1
            ,key_word:''
        }
        $scope.deploy_show=false;
        $scope.showGuid = function () {
             return $state.current.url.indexOf("/index") === 0;
        }
        $scope.showQuestion = function () {
             return $state.current.url.indexOf("/require/") === 0;
        }
        $scope.search = function(){
            if(_kit.isEmpty(search.key_word)){
                _kit.d('请输入搜索关键字');
                return false;
            }
            switch(search.tab_index){
                case 1:search_require();break;
                case 2:search_material();break;
                case 3:
                default:
                search_bianker();break;
            }
        }
     }]);

    /**
     * 搜索需求
     */
     function search_require() {
        _kit.get('search/require',{word:_search.key_word},function (res) {
             /* body... */ 
        });
     }
     /**
     * 搜索素材
     */
     function search_material() {
     }
     /**
     * 搜索编客
     */
     function search_bianker() {
     }
});