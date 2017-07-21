/**
 * Created by allen on 17-4-14.
 */
// import axiosConfig from '../../../utils/axios_config'
//
// let install = $axios.create(axiosConfig)

export default {
    ac_hot_word_add({commit}, param) { // 热词添加
        $axios({
            method: 'post',
            url: '/api/admin/hotWord/add',
            headers: {"Content-Type": "application/json"},
            params: param
        }).then((res)=>{
            // console.log('添加热词返回', res)
            if (res.status === 200) {
                commit('mut_hotWord_success', true)
            }
        })
    },
    ac_hot_word_list({commit}) { // 热词列表
        $axios.get('/api/admin/hotWord/list').then((res)=>{
            // console.log('热词列表',res)
            return res.data.data
        }).then((d)=>{
            commit('mut_hot_word', d)
            commit('mut_hotWord_success', false)
        })
    },
    ac_hot_word_remove({commit}, param) {
        $axios.delete('/api/admin/hotWord/remove', {
            params: param
        }).then((res)=>{
            if (res.status === 200) {
                commit('mut_hotWord_success', true)
            }
        })
    },
    ac_gift_list({commit}, param) { // 礼物列表获取
        $axios.get('/api/admin/present/list').then((res)=>{
            return res.data
        }).then((d)=>{
            commit('mut_gift_list', d.data)
            commit('mut_gift_success_back', false)
        })
    },
    ac_gift_remove({commit}, param) { // 礼物删除
        $axios.delete('/api/admin/present/remove', {
            params: {
                id: param.id
            }
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_gift_success_back', true)
            }
        })
    },
    ac_gift_save({commit}, param) { // 礼物添加
        $axios({
            method: 'post',
            url: '/api/admin/present/save',
            data: JSON.stringify(param),
            headers: {"Content-Type": "application/json"}
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_gift_success_back', true)
            }
        })
    },
    ac_live_list({commit}, param) { // 直播列表
        $axios.get('/api/admin/play/list', {
            params: param
        }).then((res)=>{
            return res.data
        }).then(d=>{
            commit('mut_live_list', d.data.data)
            commit('mut_live_total', d.data.total)
            commit('mut_live_success_back', false)
        })
    },
    ac_disable_chartroom({commit}, param) { // 禁用聊天室
        $axios({
            method: 'post',
            url: '/api/admin/play/disableChatRoom/'+param.id,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_disable_live({cmomit}, param) { // 中断直播
        $axios({
            method: 'post',
            url: '/api/admin/play/disableLive/'+param.id,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_disable_play({commit}, param) { // 禁播
        $axios({
            method: 'post',
            url: '/api/admin/play/disablePlay/'+param.id,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_live_edit({commit}, param) {
        $axios({
            method: 'post',
            url: '/api/admin/play/modify',
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(param)
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    }
}
