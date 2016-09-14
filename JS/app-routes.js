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
                ,params:{'id':'','userids':''}
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
            //订单列表
            .state('app.personOrderList', {
                url: '/person/order/list/:id'
                ,params:{'id':''}
                ,views:{
                    'body': {
                      templateUrl: '../person-order-list.html'
                      ,controllerUrl: 'system/personOrderListCtrl'
                      ,controller: 'personOrderListCtrl'
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
            //忘记密码
            .state('app.findPassword', {
                url: '/findPassword'
                ,views:{
                    'body': {
                        templateUrl: '../find-password.html'
                        ,controllerUrl: 'system/findPasswordCtrl'
                        ,controller: 'passwordCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            //需求大厅
            .state('app.allRequires', {
                url: '/allRequires'
                ,views:{
                    'body': {
                        templateUrl: '../allRequires.html'
                        ,controllerUrl: 'system/allRequiresCtrl'
                        ,controller: 'allRequiresCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
                ,cache:true
            })
            //托管赏金
            .state('app.moneyPay', {
                url: '/moneyPay'
                ,views:{
                    'body': {
                        templateUrl: '../money-pay.html'
                        ,controllerUrl: 'system/moneyPayCtrl'
                        ,controller: 'moneyPayCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            //账户设置-个人资料
            .state('app.userInfo', {
                url: '/userInfo'
                ,views:{
                    'body': {
                        templateUrl: '../user-info.html'
                        ,controllerUrl: 'system/userInfoCtrl'
                        ,controller: 'userInfoCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            //账户设置-个我的账号
            .state('app.userSetting', {
                url: '/userSetting'
                ,views:{
                    'body': {
                        templateUrl: '../user-setting.html'
                        ,controllerUrl: 'system/userSettingCtrl'
                        ,controller: 'userSettingCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            ;
    }]);
});