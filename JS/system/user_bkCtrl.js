define(function (require) {
     'use strict';
     var app = require('../app');
     var _kit
        ,_stg;
     app.controller('user_bkCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        $rootScope.user_bk_index_step = 0;
        $rootScope._role = 1;
     }]);

});