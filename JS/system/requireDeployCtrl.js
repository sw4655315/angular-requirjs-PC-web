define(function (require) {
     'use strict';
     var app = require('../app');

     app.controller('requireDeployCtrl',['$scope',function ($scope) {
        $scope.deploy_step=1;
     }]);
});