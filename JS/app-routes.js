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
                url: '/login/:flag'
                ,params:{'flag':''}
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
            //个人首页-编客
            .state('app.user_bk', {
                url: '/user_bk'
                ,abstract:true
                ,views:{
                    'body': {
                        templateUrl: '../user-bk.html'
                        ,controllerUrl: 'system/user_bkCtrl'
                        ,controller: 'user_bkCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            //个人首页-编客-身份认证
            .state('app.user_bk.index', {
                url: '/index'
                ,templateUrl: '../user-bk-index.html'
                ,controllerUrl: 'system/bkIndexCtrl'
                ,controller: 'bkIndexCtrl'
                ,dependencies: ['system/_kit']
            })
            //个人首页-编客-身份认证
            .state('app.user_bk.order_list', {
                url: '/order_list'
                ,templateUrl: '../user-bk-order-list.html'
                ,controllerUrl: 'system/bkOrderListCtrl'
                ,controller: 'bkOrderListCtrl'
                ,dependencies: ['system/_kit']
            })
            //个人首页-雇主
            .state('app.user_gz', {
                url: '/user_gz'
                ,abstract:true
                ,views:{
                    'body': {
                        templateUrl: '../user-gz.html'
                        ,controllerUrl: 'system/user_gzCtrl'
                        ,controller: 'user_gzCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            //个人首页-编客-身份认证
            .state('app.user_gz.order_list', {
                url: '/order_list'
                ,templateUrl: '../user-gz-order-list.html'
                ,controllerUrl: 'system/gzOrderListCtrl'
                ,controller: 'gzOrderListCtrl'
                ,dependencies: ['system/_kit']
            })
            //个人首页-编客-身份认证
            .state('app.user_gz.evaluate_manage', {
                url: '/evaluate_manage'
                ,templateUrl: '../user-gz-evaluate-manage.html'
                ,controllerUrl: 'system/evaluateManageCtrl'
                ,controller: 'evaluateManageCtrl'
                ,dependencies: ['system/_kit']
            })



            //账户设置-个人资料
            .state('app.user', {
                url: '/user'
                ,abstract:true
                ,views:{
                    'body': {
                        templateUrl: '../user.html'
                        // ,controller: function($state){
                        //     $state.go('app.user.info');
                        // }
                    }
                }
            })
            //账户设置-个人资料
            .state('app.user.info', {
                url: '/info'
                ,templateUrl: '../user-info.html'
                ,controllerUrl: 'system/userInfoCtrl'
                ,controller: 'userInfoCtrl'
                ,dependencies: ['system/_kit']
                
            })
            //账户设置-我的账号
            .state('app.user.setting', {
                url: '/setting'
                ,templateUrl: '../user-setting.html'
                ,controllerUrl: 'system/userSettingCtrl'
                ,controller: 'userSettingCtrl'
                ,dependencies: ['system/_kit']
                
            })
            //个人首页-评价管理
            .state('app.evaluateManage', {
                url: '/evaluateManage'
                ,views:{
                    'body': {
                        templateUrl: '../evaluate-manage.html'
                        ,controllerUrl: 'system/evaluateManageCtrl'
                        ,controller: 'evaluateManageCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            //意见反馈
            .state('app.feedBack', {
                url: '/feedBack'
                ,views:{
                    'body': {
                        templateUrl: '../Feedback.html'
                        ,controllerUrl: 'system/feedBackCtrl'
                        ,controller: 'feedBackCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            //服务协议
            .state('app.serverRule', {
                url: '/serverRule'
                ,views:{
                    'body': {
                        templateUrl: '../server-rule.html'
                        ,controllerUrl: 'system/serverRuleCtrl'
                        ,controller: 'serverRuleCtrl'
                        ,dependencies: ['system/_kit']
                    }
                }
            })
            ;
    }]);
});