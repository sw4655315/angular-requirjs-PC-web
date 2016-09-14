define(function (require) {
    'use strict';
    var app = require('app');
    var _kit,_stg,_state,_form,_cuser;

    app.controller('userInfoCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.menu.menu_type = 2;
        $rootScope.menu.menu_index = 2;
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _stg.needSignin();
        _state = $rootScope.$state;
        _cuser = $scope.cuser = _stg.user();;
        _form = $scope.loginForm = {
            nickname:_cuser.nickname,
            mobile:_cuser.mobile,
            photo:null
        };
    }]);

});