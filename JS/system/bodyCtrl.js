define(function(require) {
    'use strict';
    var app = require('../app');
    require('swiper');

    app.controller('bodyCtrl', ['$scope', '$modal', '$alert','$rootScope', function($scope, $modal, $alert,$rootScope) {
        $rootScope.menu.menu_type = 1;
        $rootScope.menu.menu_index = 1;
        var _kit = app.get('$kit');
        $scope.kit = _kit;

        var swiper = new Swiper('.swiper-container', {  //首页轮播
            autoplay: 2500,
            centeredSlides: true,
            autoplayDisableOnInteraction: false,
            loop: true
        });
        $scope.isShow = false;

    }]);
});
