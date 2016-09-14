define(function (require) {
    'use strict';
    var app = require('app');
    var _kit,_stg,_state,_form;

    app.controller('moneyPayCtrl',['$scope','$rootScope','$interval',function ($scope,$rootScope,$interval) {
        _kit = app.get('$kit');
        _stg = app.get('$stg');
        _state = $rootScope.$state;
        _form = $scope.loginForm = {};

        $scope.deploy_finish = function(){
            _state.go('app.requireDetail');
            // _kit.ap('employer/deployNeed',_form,function(res){
            //     _state.go('app.requireDetail',{id:res.id});
            // });
        }
    }]);

});