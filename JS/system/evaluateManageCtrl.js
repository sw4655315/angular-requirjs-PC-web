define(function (require) {
    'use strict';
    var app = require('app');
    var _kit,_stg,_state,_form,_cuser,_dict;

    app.controller('evaluateManageCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _dict = $scope._dict = app.get('$dict');
        _state = $rootScope.$state;
        _form = $scope.loginForm = {};

        $scope.init = function () {
            _cuser = _stg.user();
            if(!_kit.isExist(_cuser)){
                _state.go('login');
                return !1;
            }
        }
        $scope.init();
    }]);

});