/**
 * Created by allen on 17-4-14.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import account from './modules/account'
import category from './modules/category'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: ''
    },
    getters,
    actions,
    mutations,
    modules: {
        account,
        category,
    }
})
