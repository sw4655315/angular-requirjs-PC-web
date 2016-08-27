define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');
    require('angular-loading-bar');

    var app = angular.module('app', ['ui.router','ngAnimate','mgcrea.ngStrap','angular-loading-bar']);



    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(function($modalProvider,$alertProvider) {
      angular.extend($modalProvider.defaults, {
        // animation: 'am-flip-x'
      });
      angular.extend($alertProvider.defaults, {
        placement: 'top-right'
        ,duration: 5
        ,container: '.toast-container'
        ,show: true
      });
    })

    // initialze app module for angular-async-loader
    asyncLoader.configure(app);

    module.exports = app;
});