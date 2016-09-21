define(function (require) {
    'use strict';
    var app = require('app');
    var _kit,_stg,_state,_form,_cuser;

    app.controller('feedBackCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _state = $rootScope.$state;
        _form = $scope.loginForm = {};


        _cuser = $scope.cuser = _stg.user();
    }]);
});