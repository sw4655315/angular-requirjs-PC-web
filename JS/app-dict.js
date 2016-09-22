define(function (require, exports, module) {
    var d = {};
    //交易类型
    d.trade_type = {
        '1':'比稿'
    };
    //奖金分配模式
    d.reward_type = {
        '1':'单人独享'
    };
    //小编身份认证
    d.bianker_type = {
        '1':'身份认证'
        ,'2':'手机认证'
    };
    //用户类型
    d.user_type = {
        '1':'编客'
        ,'2':'雇主'
    };
    //需求状态-小编
    d.need_status_bianker = {
        '1':'全部'
        ,'2':'投搞中'
        ,'3':'已关闭'
        ,'4':'待评价'
        ,'5':'已结束'
        ,'6':'退款'
    };
    //需求状态-雇主
    d.need_status_employer = {
        '1':'全部'
        ,'2':'投搞中'
        ,'3':'已关闭'
        ,'4':'待评价'
        ,'5':'已结束'
        ,'6':'退款'
    };
    //需求状态-雇主
    d.person_state = {
        '0':'未登录'
        ,'1':'已登录，不是自己发布的需求'
        ,'2':'已登录，是自己发布的需求'
    };

    d.page_map = {
        '0':'app.index'
        ,'1':'app.requireDeploy'
        ,'2':'app.user_bk.index'
    }



    module.exports = d;
});