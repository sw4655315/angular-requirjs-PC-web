define(function (require) {
     'use strict';
     var app = require('../app');
     var _kit
        ,_stg
        ,_state;
     app.controller('mainCtrl',['$scope','$state',function ($scope,$state) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _state = $state;
        //searchTab_index
        //1:需求
        //2:素材
        //3:编客
        $scope.searchTab_index = 1;
        $scope.deploy_show=false;
        $scope.showGuid = function () {
             return $state.current.url.indexOf("/index") === 0;
        }
        $scope.showQuestion = function () {
             return $state.current.url.indexOf("/require/") === 0;
        }
     }]);
});