/**
 * Created by allen on 17-4-14.
 */
import {getUrl} from '../../../utils/utils'

export default {
    ac_accountLists ({commit}, param) { // 用户列表
        $axios.get(getUrl('/api/admin/user/list', param)).then((res) => {
            // console.log('ok:', res);
            return res.data.data
        }).then((d) => {
            commit('mut_total', d.total)
            commit('mut_account_Lists', d.data)
        }).catch(e => {
            console.log(e)
        })
    },

    // 禁用
    ac_disableUser ({commit}, param) {
        console.log(param)
        $axios.get(getUrl('/api/admin/user/disableUser', param)).then(res=>{
            console.log(res)
        })
    },

    // 解禁
    ac_enableUser ({commit}, param) {
        $axios.get(getUrl('/api/admin/user/enableUser', param)).then(res=>{
            console.log(res)
        })
    },

    // 用户详细
    ac_userInfo ({commit}, param) {
        $axios.get(getUrl('/api/admin/user/getUser', param)).then(res=>{
            return res.data.data
        }).then(d=>{
            commit('mut_userInfo', d)
        })
    },

    // 用户修改
    ac_modify_user ({commit}, param) {
        let p = {};

        param.gender === '男' ? param.gender='MALE' : param.gender='FEMALE'
        Object.keys(param).forEach(key=>{
            if (param[key]) {
                p[key] = param[key]
            }
        })

        $axios({
            method: 'post',
            url: '/api/admin/user/modify',
            headers: {"Content-Type":"application/json"},
            data: JSON.stringify(p)
        })
    }
}
