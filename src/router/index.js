/**
 * Created by allen on 17-3-13.
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const test = resolve => require.ensure([], () => resolve(require('../pages/test.vue')), 'test')
const signin = resolve => require.ensure([], () => resolve(require('../pages/sign/signin.vue')), 'sign')

export default new Router({
    // mode: 'history', // 这个模式路由没有#
    routes: [
        {
            path: '',
            component: signin,
        },
        {
            path: '/test',
            name: 'test',
            component: test
        }
    ]
})
