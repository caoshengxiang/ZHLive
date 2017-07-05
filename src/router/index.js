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
const accountEdit = resolve => require.ensure([], () => resolve(require('../pages/account_management/edit.vue')), 'accountManagement')

const classification = resolve => require.ensure([], () => resolve(require('../pages/classification/classification.vue')), 'classification')


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
            component: signin,
        }, {
            path: '/bg',
            name: 'bgIndex',
            component: bgIndex,
            children: [
                {
                    path: ':page',
                    name: 'accountManagement',
                    component: accountManagement
                },{
                    path: 'account/:id',
                    name: 'accountShow',
                    component: accountShow
                }, {
                    path: 'edit/:id',
                    name: 'accountEdit',
                    component: accountEdit
                }, {
                    path: 'cla',
                    name: 'classification',
                    component: classification
                }
            ]
        }
    ]
})
