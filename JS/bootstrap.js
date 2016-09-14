     'use strict';
     require.config({
        baseUrl: 'JS',
        paths: {
             'jquery': 'assets/jquery/jquery.min'
            ,'swiper': 'assets/swiper/swiper.min'
            ,'laydate': 'assets/layer/laydate/laydate'
            ,'laypage': 'assets/layer/laypage/laypage'
            ,'angular': 'assets/angular/angular.min'
            ,'angular-laydate': 'assets/layer/laydate/angular-laydate'
            ,'angular-laypage': 'assets/layer/laypage/angular-laypage'
            ,'angular-animate': 'assets/angular/angular-animate.min'
            ,'angular-cookies': 'assets/angular/angular-cookies.min'
            ,'angular-ui-router': 'assets/angular-ui/angular-ui-router.min'
            ,'angular-loading-bar': 'assets/angular-loading-bar/loading-bar.min'
            ,'angular-async-loader': 'assets/angular-async-loader/angular-async-loader.min'
            ,'angular-ngInfiniteScroll': 'assets/angular-ngInfiniteScroll/infinite-scroll'
            ,'angular-storage': 'assets/angular-storage/angular-local-storage.min'
            ,'angular-xeditable': 'assets/angular-xeditable/xeditable.min'
            ,'angular-select-address': 'assets/angular-select-address/js/selectAddress2'
            ,'ng-file-upload': 'assets/ng-file-upload/dist/ng-file-upload'
        }
        ,map:{'*':{'css': 'assets/require-css/css.min'}}
        ,shim: {
             'swiper':['css!assets/swiper/swiper.min.css']
            ,'angular': {exports: 'angular'}
            ,'angular-laydate':{deps: ['laydate']}
            ,'angular-laypage':{deps: ['laypage']}
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
            ,'laydate':[
                'css!assets/layer/laydate/need/laydate.css'
                ,'css!assets/layer/laydate/skins/default/laydate.css'
            ]
        }
    });

    require(['angular','./app-routes'], function (angular) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
            angular.element(document).find('html').addClass('ng-app');
        });
    });
