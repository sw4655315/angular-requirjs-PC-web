define(function (require) {
     'use strict';
     var app = require('../app');
     var _kit
        ,_stg
        ,_dict
        ,_state
        ,_cuser
        ,_menu
        ,_scope
        ,_search;
     app.controller('mainCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;
        _scope = $scope;
        //tab_index
        //1:需求
        //2:素材
        //3:编客
        _search = $rootScope._search = {
            tab_index:1
            ,key_word:''
        }
        _menu = $rootScope.menu = {
            menu_type:1
            ,menu_index:1
        }
        _cuser = $scope.cuser = _stg.user();



        $scope.deploy_show=false;
        $scope.showGuid = function () {
             return _state.current.url.indexOf("/index") === 0;
        }
        $scope.showQuestion = function () {
             return _state.current.url.indexOf("/require/") === 0;
        }
        $scope.searchFun = function(){
            if(_kit.isEmpty(_search.key_word)){
                _kit.d('请输入搜索关键字');
                return false;
            }
            switch(_search.tab_index){
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
        if(_state.current.url.indexOf("/allRequires") === 0){
            _scope.$broadcast('load_allRequires_date');
        }else{
            _state.go('app.allRequires');
        }
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