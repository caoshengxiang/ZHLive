/**
 * Created by allen on 17-3-13.
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const test = resolve => require.ensure([], () => resolve(require('../pages/test.vue')), 'test')
const signin = resolve => require.ensure([], () => resolve(require('../pages/sign/sign_in.vue')), 'sign')
const bgIndex = resolve => require.ensure([], () => resolve(require('../pages/index.vue')), 'bgIndex')

// 帐号管理
const accountManagement = resolve => require.ensure([], () => resolve(require('../pages/account_management/account/account_management.vue')), 'accountManagement')

const accountShow = resolve => require.ensure([], () => resolve(require('../pages/account_management/account/show.vue')), 'accountManagement')
const showDisable = resolve => require.ensure([], () => resolve(require('../pages/account_management/account/showDisable.vue')), 'accountManagement')
const showLiveApply = resolve => require.ensure([], () => resolve(require('../pages/account_management/account/showLiveApply.vue')), 'accountManagement')
const showLiveUser = resolve => require.ensure([], () => resolve(require('../pages/account_management/account/showLiveUser.vue')), 'accountManagement')
// 系统消息
const message = resolve => require.ensure([], () => resolve(require('../pages/account_management/message/message.vue')), 'message')
// 聊天室
const chatroom = resolve => require.ensure([], () => resolve(require('../pages/account_management/chatroom/chatroom.vue')), 'message')



// 帐号
const accountEdit = resolve => require.ensure([], () => resolve(require('../pages/account_management/account/edit.vue')), 'accountManagement')

// 分类
const classification = resolve => require.ensure([], () => resolve(require('../pages/classification/classify/classify.vue')), 'classification')
const showClassify = resolve => require.ensure([], () => resolve(require('../pages/classification/classify/show_classify.vue')), 'classification')
const editClassify = resolve => require.ensure([], () => resolve(require('../pages/classification/classify/edit_classify.vue')), 'classification')
const tags = resolve => require.ensure([], () => resolve(require('../pages/classification/tags/tags.vue')), 'classification')
const addClassify = resolve => require.ensure([], () => resolve(require('../pages/classification/classify/add_classify.vue')), 'classification')


// 直播管理
const liveManage = resolve => require.ensure([], () => resolve(require('../pages/live/live_manage/live.vue')), 'liveManage')
const hotWords = resolve => require.ensure([], () => resolve(require('../pages/live/hot_words/hot_words.vue')), 'liveManage')
const giftManage = resolve => require.ensure([], () => resolve(require('../pages/live/gift_manage/gift_manage.vue')), 'liveManage')

// 支付管理
const paymentWealth = resolve => require.ensure([], () => resolve(require('../pages/payment/user_wealth/wealth.vue')), 'paymentManage')
const paymentAnchor = resolve => require.ensure([], () => resolve(require('../pages/payment/anchor/anchor.vue')), 'paymentManage')
const paymentCash = resolve => require.ensure([], () => resolve(require('../pages/payment/cash/cash.vue')), 'paymentManage')

// banner管理
const banner = resolve => require.ensure([], () => resolve(require('../pages/banner/banner.vue')), 'banner')

// 举报/反馈
const report = resolve => require.ensure([], () => resolve(require('../pages/report/report/report.vue')), 'report')
const feedback = resolve => require.ensure([], () => resolve(require('../pages/report/feedback/feedback.vue')), 'report')

// 版本管理
const version = resolve => require.ensure([], () => resolve(require('../pages/version/version/version.vue')), 'version')


export default new Router({
    // mode: 'history', // 这个模式路由没有#
    routes: [
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '',
            name: 'signIn',
            component: signin,
        }, {
            path: '/bg',
            name: 'bgIndex',
            component: bgIndex,
            children: [
                { // 帐号管理
                    path: ':type/:page',
                    name: 'accountManagement',
                    component: accountManagement
                },{
                    path: 'account/all/:id',
                    name: 'accountShow',
                    component: accountShow
                }, {
                    path: 'account/edit/:id',
                    name: 'accountEdit',
                    component: accountEdit
                }, {
                    path: 'account/disable/:id',
                    name: 'showDisable',
                    component: showDisable
                }, {
                    path: 'account/live/:id',
                    name: 'showLiveUser',
                    component: showLiveUser
                }, {
                    path: 'account/apply/:id',
                    name: 'showLiveApply',
                    component: showLiveApply
                }, { // 系统消息
                    path: 'account/msg/:page',
                    name: 'message',
                    component: message
                }, { // 聊天室
                    path: 'account/c_r/:page',
                    name: 'chatroom',
                    component: chatroom
                }, { // 分类
                    path: 'classify/cla/m',
                    name: 'classification',
                    component: classification
                }, {
                    path: 'classify/cla/detail/:id',
                    name: 'showClassify',
                    component: showClassify
                }, {
                    path: 'classify/cla/add',
                    name: 'addClassify',
                    component: addClassify
                }, {
                    path: 'classify/cla/edit/:id',
                    name: 'editClassify',
                    component: editClassify
                }, {
                    path: 'classify/tags/m',
                    name: 'tags',
                    component: tags
                }, { // 直播管理
                    path: 'live/type/:type/:page',
                    name: 'liveManage',
                    component: liveManage
                }, { //
                    path: 'live/hot',
                    name: 'hotWords',
                    component: hotWords
                }, { //
                    path: 'live/gift/:page',
                    name: 'giftManage',
                    component: giftManage
                }, { // 支付管理
                    path: 'payment/m/wealth',
                    name: 'paymentManage',
                    component: paymentWealth
                }, {
                    path: 'payment/m/anchor',
                    name: 'paymentAnchor',
                    component: paymentAnchor
                }, {
                    path: 'payment/m/cash',
                    name: 'paymentCash',
                    component: paymentCash
                }, { // Banner管理
                    path: 'banner/:type/:page',
                    name: 'bannerManage',
                    component: banner
                }, { // 举报反馈
                    path: 'report',
                    name: 'reportManage',
                    component: report
                }, {
                    path: 'feedback',
                    name: 'feedback',
                    component: feedback
                }, { // 版本管理
                    path: 'version',
                    name: 'version',
                    component: version
                }
            ]
        }
    ]
})
