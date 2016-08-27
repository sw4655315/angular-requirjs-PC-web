define(function (require) {
     'use strict';
     var app = require('../app');

     app.controller('headerCtrl',['$scope',function ($scope) {
        $scope.searchTab_index = 2;
        $scope.deploy_show=false;
     }]);
});