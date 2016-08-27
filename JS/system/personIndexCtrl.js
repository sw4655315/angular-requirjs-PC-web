define(function (require) {
     'use strict';
     var app = require('../app');
     //加载 省市县 选择器
     require('angular-select-address');
     app.useModule('selectAddress');

     app.controller('personIndexCtrl',['$scope',function ($scope) {
        $scope.spanText = "哈哈哈";
        $scope.p = '' || '北京';
        $scope.c = '';
        $scope.a = '';
     }]);
});