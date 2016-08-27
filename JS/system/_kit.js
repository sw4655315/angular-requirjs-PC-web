define(function (require) {
     'use strict';
     var angular = require('angular');
     var app = require('app');
     var c = require('app-config');

     require('angular-storage');
     app.useModule('LocalStorageModule');


    angular.module('_kit', [])
    .service('$stg',function(localStorageService){
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
        return stg;
    })
    .service('$kit',function($http,$alert,$modal){
        var kit = angular.extend({},c);
        kit.isEmpty = function(obj){
            return obj === void 0 
                || typeof obj  === "undefined"
                || obj === null 
                || obj === ''
                || obj === 'null';
        }
        kit.isExist = function(obj){
            if(kit.isEmpty(obj)) return !1;
            if(angular.isArray(obj)) return obj.length > 0;
            if(angular.isObject(obj)) return !isEmptyObject(obj);
            return !0;
        }

        function isEmptyObject(e){
            var t;
            for (t in e) 
                return !1;
            return !0;
        }
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
                data  : data || {}
            })
            .success(successFun|| function(){})
            .error(errorFun || function(){})
            .finally(finallyFun||function(){});
        };
        kit.ap = kit.autoPost = function(url,data,success,error,finallyFun){
            kit.post(url,data
                ,function(res,header,config,status){
                    if(!res || res.rspCode !== kit.http.ok){
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
                params: data || {},
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
                        kit.d(res.rspMsg);
                        return false;
                    }
                    success(res.rspObject);
                },function(res,header,config,status){
                    console.error(res);
            },finallyFun);
        };
        return kit;
    })
    .config(function(localStorageServiceProvider){
        //本地存在设置
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
    ;
    app.useModule('_kit');
});