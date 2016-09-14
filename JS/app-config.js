define(function (require, exports, module) {
    var c = {};
    c.uri = "http://192.168.1.34:8911/web/jf/web/";
    // c.uri = "http://192.168.1.77:22222/mockjsdata/5/jf/web/";
    c.reg = {};
    c.reg.mobile = /^1[3578]\d{9}$/;
    c.reg.pwd = /^\w{6,16}$/;
    c.reg.captcha = /^\d{6}$/;
    c.reg.reward_rmb = /^[1-9]\d{2,}$/;
    c.reg.real_name = /^([\u4e00-\u9fa5]{2,4})$/;
    c.reg.id_card = /^(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)))$/
    c.http = {};
    c.http.ok = 200;
    module.exports = c;
});