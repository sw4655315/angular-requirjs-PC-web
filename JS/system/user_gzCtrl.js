define(function (require) {
     'use strict';
     var app = require('../app');
     app.controller('user_gzCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope._role = 2;
     }]);

});