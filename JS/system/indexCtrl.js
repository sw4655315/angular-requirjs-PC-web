define(function (require) {
     'use strict';
     var app = require('../app');

     app.controller('indexCtrl',['$scope',function ($scope) {
        $scope.spanText = "哈哈哈";
     }]);
});