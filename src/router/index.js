/**
 * Created by allen on 17-3-13.
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const test = resolve => require.ensure([], () => resolve(require('../pages/test.vue')), 'test')
const signin = resolve => require.ensure([], () => resolve(require('../pages/sign/sign_in.vue')), 'sign')
const bgIndex = resolve => require.ensure([], () => resolve(require('../pages/index.vue')), 'bgIndex')
const accountManagement = resolve => require.ensure([], () => resolve(require('../pages/account_management/account_management.vue')), 'accountManagement')

const accountShow = resolve => require.ensure([], () => resolve(require('../pages/account_management/show.vue')), 'accountManagement')
const showDisable = resolve => require.ensure([], () => resolve(require('../pages/account_management/showDisable.vue')), 'accountManagement')
const showLiveApply = resolve => require.ensure([], () => resolve(require('../pages/account_management/showLiveApply.vue')), 'accountManagement')
const showLiveUser = resolve => require.ensure([], () => resolve(require('../pages/account_management/showLiveUser.vue')), 'accountManagement')
// 系统消息
const message = resolve => require.ensure([], () => resolve(require('../pages/account_management/message/message.vue')), 'message')


const accountEdit = resolve => require.ensure([], () => resolve(require('../pages/account_management/edit.vue')), 'accountManagement')

const classification = resolve => require.ensure([], () => resolve(require('../pages/classification/classification.vue')), 'classification')

// 直播管理
const liveManage = resolve => require.ensure([], () => resolve(require('../pages/live/live.vue')), 'liveMage')

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
                {
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
                }, { // 分类
                    path: 'cla',
                    name: 'classification',
                    component: classification
                }, { //
                    path: 'live/:type',
                    name: 'liveType',
                    component: liveManage
                }
            ]
        }
    ]
})
