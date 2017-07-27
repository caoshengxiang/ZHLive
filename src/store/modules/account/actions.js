/**
 * Created by allen on 17-4-14.
 */
import {getUrl} from '../../../utils/utils'

export default {
    ac_accountLists ({commit}, param) { // 用户列表
        // eslint-disable-next-line
        $axios.get(getUrl('/api/admin/user/list', param)).then((res) => {
            // console.log('ok:', res);
            return res.data.data
        }).then((d) => {
            commit('mut_total', d.total)
            commit('mut_account_Lists', d.data)
            commit('mut_success_back', false)
        }).catch(e => {
            console.log(e)
        })
    },

    // 禁用
    ac_disableUser ({commit}, param) {
        // eslint-disable-next-line
        $axios.get(getUrl('/api/admin/user/disableUser', param.param1)).then(res => {
            if (res.status === 200) {
                $axios.get(getUrl('/api/admin/user/list', param.param2)).then((res2) => { //eslint-disable-line
                    // console.log('ok:', res2);
                    return res2.data.data
                }).then((d) => {
                    commit('mut_total', d.total)
                    commit('mut_account_Lists', d.data)
                }).catch(e => {
                    console.log(e)
                })
            }
        })
    },

    // 解禁
    ac_enableUser ({commit}, param) {
        // eslint-disable-next-line
        $axios.get(getUrl('/api/admin/user/enableUser', param.param1)).then(res => {
            if (res.status === 200 && param.param2) {
                $axios.get(getUrl('/api/admin/user/list', param.param2)).then((res2) => { // eslint-disable-line
                    // console.log('ok:', res2);
                    return res2.data.data
                }).then((d) => {
                    commit('mut_total', d.total)
                    commit('mut_account_Lists', d.data)
                }).catch(e => {
                    console.log(e)
                })
            }
        })
    },

    // 用户详细
    ac_userInfo ({commit}, param) {
        // eslint-disable-next-line
        $axios.get(getUrl('/api/admin/user/getUser', param)).then(res => {
            return res.data.data
        }).then(d => {
            commit('mut_userInfo', d)
        })
    },

    // 用户修改
    ac_modify_user ({commit}, param) {
        let p = {};

        param.gender === '男' ? param.gender = 'MALE' : param.gender = 'FEMALE'
        Object.keys(param).forEach(key => {
            if (param[key]) {
                p[key] = param[key]
            }
        })
// eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/user/modify',
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(p)
        })
    },

    // 提成比例
    ac_modify_commission({commit}, param) {
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/user/modifyCommission/' + param.userId + '_' + param.commission,
            headers: {"Content-Type": "application/json"},
        })
    },

    // 移除主播
    ac_remove_anchor({commit}, param) {
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/user/removeAnchor/' + param.userId,
            headers: {"Content-Type": "application/json"},
        }).then(res => {
            if (res.status === 200) {
                commit('mut_success_back', true)
            }
        })
    },

    // 通过主播申请
    ac_pass_apply({commit}, param) {
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/user/applyPass/' + param.userId,
            headers: {"Content-Type": "application/json"},
        }).then(res => {
            if (res.status === 200) {
                commit('mut_success_back', true)
            }
        })
    },

    // 拒绝主播申请
    ac_reject_apply({commit}, param) {
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/user/applyReject/' + param.userId,
            headers: {"Content-Type": "application/json"},
        }).then(res => {
            if (res.status === 200) {
                commit('mut_success_back', true)
            }
        })
    },

    // 添加消息
    ac_msg_add({commit}, param) {
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/msg/add',
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(param)
        }).then((res) => {
            if (res.status === 200) {
                commit('mut_msg_back', true)
            }
            return res.data
        }).then(() => {

        })
    },

    // 获取消息列表
    ac_msg_list({commit}, param) {
        // eslint-disable-next-line
        $axios({
            method: 'get',
            url: '/api/admin/msg/list/' + param.type,
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(param),
            params: {
                pageIndex: param.pageIndex,
                pageSize: param.pageSize
            }
        }).then((res) => {
            console.log(res)
            return res.data.data
        }).then(d => {
            if (param.type === 'SYSTEM') {
                commit('mut_sys_msg', d.data)
            } else {
                commit('mut_chatroom_msg', d.data)
            }
            commit('mut_msg_total', d.total)
            commit('mut_msg_back', false)
        })
    }

}