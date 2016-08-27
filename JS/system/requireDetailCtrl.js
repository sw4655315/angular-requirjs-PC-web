define(function (require) {
     'use strict';
     var app = require('../app');

     app.controller('requireDetailCtrl',['$scope',function ($scope) {
        $scope.searchTab_index = 2;
        $scope.deploy_step=1;
     }]);
});