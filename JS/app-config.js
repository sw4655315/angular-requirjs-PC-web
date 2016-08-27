define(function (require, exports, module) {
    var c = {};
    c.uri = "http://192.168.1.77:22222/mockjsdata/5/jf/web/";
    // c.uri = "http://192.168.1.77:22222/mockjsdata/5/jf/web/";
    c.reg = {};
    c.reg.mobile = /1[3578]\d{9}/;
    c.reg.pwd = /\w{6,16}/;
    c.reg.captcha = /\d{6}/;
    c.http = {};
    c.http.ok = 200;
    module.exports = c;
});