define(function (require) {
     'use strict';
     var angular = require('angular');
     var app = require('app');
     var c = require('app-config');
     var d = require('app-dict');

     require('laypage');

     require('angular-storage');
     app.useModule('LocalStorageModule');

     require('ng-file-upload');
     app.useModule('ngFileUpload');

    angular.module('_kit', [])
    .service('$stg',function(localStorageService,$state){
        /**
         * 缓存服务
         */
        var stg = angular.extend({},localStorageService);
        //缓存的sessionid
        stg.sid = function(){
            return stg.get('sid');
        }
        //缓存的用户
        stg.user = function(){
            return stg.get('user');
        }
        //清除用户信息
        stg.signout = function(){
            stg.set('sid',null);
            stg.set('user',null);
        }

        stg.isSignin = function(){
            return !isEmpty(stg.get('sid'));
        }

        stg.needSignin = function(){
            if(isEmpty(stg.get('sid'))){
                $state.go('login');
                return !1;
            }
            return !0;
        }

        stg.isBianker = function () {
            var cuser = stg.user();
            if(isEmpty(cuser)){
                return !1;
            }
            return cuser.type == '1';
        }
        stg.isEmployer = function(){
            var cuser = stg.user();
            if(isEmpty(cuser)){
                return !1;
            }
            return cuser.type == '2';
        }
        return stg;
    })    
    .service('$dict',function($stg){
        /**
         * 字典服务
         */
        var dict = angular.extend({},d);
        dict.needStatus = function(status){
            if($stg.isEmployer()){
                return dict.need_status_employer[status];
            }
            return dict.need_status_bianker[status];
        }
        return dict;
    })
    .service('$kit',function($http,$alert,$modal,$stg,Upload){
        /**
         * 工具类服务
         */
        var kit = angular.extend({},c);
        kit.isEmpty = isEmpty;
        kit.isExist = isExist;
        kit.renderPage = renderPage;
        kit.c = kit.confirm = function(msg,callback){
            var myModal = $modal({content: msg || '确定操作吗？', templateUrl:'/modal-confirm.html', show: true,placement:'center',backdrop:false}); 
            myModal.$scope.$action = function(action){
                myModal.$scope.$hide();
                if(callback)callback(action);
            }
        }
        kit.d = kit.danger = function(msg,yes){
            $alert({
                content: msg + ''
                ,type: 'danger'
                ,onHide:yes || function(){}
            });
        }
        kit.s = kit.success = function(msg,yes){
            $alert({
                content: msg + ''
                ,type: 'success'
                ,duration: 3
                ,onHide:yes || function(){}
            });
        }

        kit.post = function(url,data,successFun,errorFun,finallyFun){
            $http({
                url: kit.uri + url,
                method: 'POST',
                params: {},
                data  : angular.extend(data,{sessionid:$stg.sid()}) || {}
            })
            .success(successFun|| function(){})
            .error(errorFun || function(){})
            .finally(finallyFun||function(){});
        };
        kit.ap = kit.autoPost = function(url,data,success,error,finallyFun){
            kit.post(url,data
                ,function(res,header,config,status){
                    if(!res || res.rspCode !== kit.http.ok){
                        if(res.rspCode == 503) $stg.signout();
                        kit.d(res.rspMsg);
                        return false;
                    } 
                    success(res.rspObject);
                },function(res,header,config,status){
                    console.error(res);
            },finallyFun);
        };
        kit.get = function(url,data,success,error,finallyFun){
            $http({
                url: kit.uri + url,
                method: 'GET',
                params: angular.extend(data,{sessionid:$stg.sid()}) || {},
                data  : {}
            })
            .success(success|| function(){})
            .error(error || function(){})
            .finally(finallyFun||function(){});
        };
        kit.ag = kit.autoGet = function(url,data,success,error,finallyFun){
            kit.get(url,data
                ,function(res,header,config,status){
                    if(!res || res.rspCode !== kit.http.ok){
                        if(res.rspCode == 503) $stg.signout();
                        kit.d(res.rspMsg);
                        return false;
                    }
                    success(res.rspObject);
                },function(res,header,config,status){
                    console.error(res);
            },finallyFun);
        };

        kit.apf = kit.autoPostWithFile = function(url,data,success,error,finallyFun){
            var upload = Upload.upload({
                url:kit.uri + url
                ,data:angular.extend(data,{sessionid:$stg.sid()})
            });
            upload.then(function (res) {
                if(!res || kit.isEmpty(res.data)){
                    kit.d('请求失败，请稍候重试。');
                    return !1;
                }
                if(res.data.rspCode != kit.http.ok){
                    if(res.rspCode == 503) $stg.signout();
                    kit.d(res.data.rspMsg || '请求失败，请稍候重试！');
                    return !1;
                }
                success(res.data.rspObject);
            },function(res){
                console.error(res);
            },finallyFun);
        };
        return kit;
    })
    .config(function(localStorageServiceProvider){
        //本地存储设置
        localStorageServiceProvider.prefix = 'bianker';
        localStorageServiceProvider.storageType = "sessionStorage";
    })
    .config(function($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
    }];
    })
    .filter('trustHtml', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    })
    ;
    app.useModule('_kit');
    /**
     * 判断是否为空
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    function isEmpty(obj){
        return obj === void 0 
                || typeof obj  === "undefined"
                || obj === null 
                || obj === ''
                || obj === 'null';
    }
    /**
     * 判断是否存在
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    function isExist(obj){
        if(isEmpty(obj)) return !1;
        if(angular.isArray(obj)) return obj.length > 0;
        if(angular.isObject(obj)) return !isEmptyObject(obj);
        return !0;
    }

/**
 * 判断是否为空对象
 * @param  {[type]}  e [description]
 * @return {Boolean}   [description]
 */
    function isEmptyObject(e){
        var t;
        for (t in e) 
            return !1;
        return !0;
    }


    function renderPage(page,jump){
        laypage({
            cont:'laypage'
            ,pages:page.totalPage
            ,skin: 'molv'
            ,curr:page.pageNumber
            ,first:page.pageNumber
            ,last:page.totalPage
            ,prev:'<'
            ,next:'>'
            ,jump:jump || function(){}
        });
    }
});