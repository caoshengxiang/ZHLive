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
            url: 'api/admin/hotWord/add',
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
        $axios.get('api/admin/hotWord/list').then((res)=>{
            // console.log('热词列表',res)
            return res.data.data
        }).then((d)=>{
            commit('mut_hot_word', d)
            commit('mut_hotWord_success', false)
        })
    },
    ac_hot_word_remove({commit}, param) {
        $axios.delete('api/admin/hotWord/remove', {
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
    ac_gift_save({commit}, param) {
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
    }
}
