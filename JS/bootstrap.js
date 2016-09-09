     'use strict';
     require.config({
        baseUrl: 'JS',
        paths: {
             'jquery': 'assets/jquery/jquery.min'
            ,'swiper': 'assets/swiper/swiper.min'
            ,'laydate': 'assets/layer/laydate/laydate'
            ,'angular': 'assets/angular/angular.min'
            ,'angular-laydate': 'assets/layer/laydate/angular-laydate'
            ,'angular-animate': 'assets/angular/angular-animate.min'
            ,'angular-cookies': 'assets/angular/angular-cookies.min'
            ,'angular-ui-router': 'assets/angular-ui/angular-ui-router.min'
            ,'angular-loading-bar': 'assets/angular-loading-bar/loading-bar.min'
            ,'angular-async-loader': 'assets/angular-async-loader/angular-async-loader.min'
            ,'angular-ngInfiniteScroll': 'assets/angular-ngInfiniteScroll/infinite-scroll'
            ,'angular-storage': 'assets/angular-storage/angular-local-storage.min'
            ,'angular-xeditable': 'assets/angular-xeditable/xeditable.min'
            ,'angular-select-address': 'assets/angular-select-address/js/selectAddress2'
        }
        ,map:{'*':{'css': 'assets/require-css/css.min'}}
        ,shim: {
             'swiper':['css!assets/swiper/swiper.min.css']
            ,'angular': {exports: 'angular'}
            ,'angular-laydate':{deps: ['laydate']}
            ,'angular-ui-router': {deps: ['angular']}
            ,'angular-loading-bar': {deps: ['angular','angular-animate']}
            ,'angular-select-address': {deps: ['jquery']}
            ,'angular-xeditable': ['css!assets/angular-xeditable/xeditable.min.css']
            ,'angular-loading-bar': ['css!assets/angular-loading-bar/loading-bar.min.css']
            ,'angular-ngDialog': [
                'css!assets/angular-ngDialog/ngDialog.min.css'
                ,'css!assets/angular-ngDialog/ngDialog-theme-plain.min.css'
                ,'css!assets/angular-ngDialog/ngDialog-theme-default.min.css'
                ,'css!assets/angular-ngDialog/ngDialog-custom-width.css'
                ]
        }
    });

    require(['angular','./app-routes'], function (angular) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
            angular.element(document).find('html').addClass('ng-app');
        });
    });
