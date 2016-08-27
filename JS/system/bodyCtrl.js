define(function(require) {
    'use strict';
    var app = require('../app');
    require('swiper');

    app.controller('bodyCtrl', ['$scope', '$modal', '$alert', function($scope, $modal, $alert) {
        var $kit = app.get('$kit');
        // $scope.myModal = $modal({content: 'My Content', templateUrl:'/modal-confirm.html', show: true,placement:'center',btn:'123'}); 
        // $scope.myModal.$scope.btn = [{
        //     text:'确定'
        // }];
        // console.log($scope);
        $scope.kit = $kit;
        // $kit.d($kit.sid());
        // console.log($kit.isEmpty(null));
        $scope.spanText = "哈哈哈";
        var swiper = new Swiper('.swiper-container', {  //首页轮播
            autoplay: 2500,
            centeredSlides: true,
            autoplayDisableOnInteraction: false,
            loop: true
        });
    }]);
});
