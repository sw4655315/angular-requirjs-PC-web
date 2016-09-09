define(function (require) {
     'use strict';
     /**
      * 需求详情页
      */
     var app = require('app');
     var _kit,_stg,_state,_dict,_paras;
     app.controller('requireDetailCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        _kit = $scope._kit = app.get('$kit');
        _stg = $scope._stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;
        _paras = $rootScope.$stateParams;
        /**
         * 初始化加载
         */
        $scope.init = function () {
            if(_kit.isEmpty(_paras.id)){
                _kit.d('页面加载失败');
                return false;
            }
            _kit.ag('employee/needInfo/'+_paras.id,{},function (res) {
                $scope.employer = res.employer;
                $scope.need = res.need;
                $scope.need.first_dir = res.need.category.split('_')[0];
                $scope.need.second_dir = res.need.category.split('_')[1];
            })
        }
        $scope.init();
     }]);
});