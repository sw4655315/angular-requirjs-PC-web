define(function (require) {
    var app = require('./app');
    
    require('system/mainCtrl');

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');

        $stateProvider
            .state('app', {
                url: ''
                ,abstract:true
                ,templateUrl: '../layout.html'
                ,controller: 'mainCtrl'
            })
            //首页
            .state('app.index', {
                url: '/index'
                ,views:{
                    'body': {
                      templateUrl: '../indexBody.html'
                      ,controllerUrl: 'system/bodyCtrl'
                      ,controller: 'bodyCtrl'
                      ,dependencies: ['system/_kit']
                    }
                }
            })
            //发布需求
            .state('app.requireDeploy', {
                url: '/require/deploy'
                ,views:{
                    'body': {
                      templateUrl: '../require-deploy.html'
                      ,controllerUrl: 'system/requireDeployCtrl'
                      ,controller: 'requireDeployCtrl'
                      ,dependencies: ['system/_kit']
                    }
                }
                
            })
            //需求详情
            .state('app.requireDetail', {
                url: '/require/detail/:id'
                ,params:{'id':''}
                ,views:{
                    'body': {
                      templateUrl: '../require-detail.html'
                      ,controllerUrl: 'system/requireDetailCtrl'
                      ,controller: 'requireDetailCtrl'
                      ,dependencies: ['system/_kit']
                    }
                }
            })
            //个人信息主页
            .state('app.personIndex', {
                url: '/person/index/:id'
                ,params:{'id':''}
                ,views:{
                    'body': {
                      templateUrl: '../person-index.html'
                      ,controllerUrl: 'system/personIndexCtrl'
                      ,controller: 'personIndexCtrl'
                      ,dependencies: ['system/_kit']
                    }
                }
            })
            //登录
            .state('login', {
                url: '/login'
                ,templateUrl: '../login.html'
                ,controllerUrl: 'system/loginCtrl'
                ,controller: 'loginCtrl'
                ,dependencies: ['system/_kit']
            })
            //注册
            .state('register', {
                url: '/register'
                ,templateUrl: '../register.html'
                ,controllerUrl: 'system/registerCtrl'
                ,controller: 'registerCtrl'
                ,dependencies: ['system/_kit']
            })
            ;
    }]);
});