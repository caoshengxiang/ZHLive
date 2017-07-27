/**
 * Created by allen on 17-4-14.
 */


export default {
    ac_hot_word_add({commit}, param) { // 热词添加
        // eslint-disable-next-line
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
        // eslint-disable-next-line
        $axios.get('/api/admin/hotWord/list').then((res)=>{
            // console.log('热词列表',res)
            return res.data.data
        }).then((d)=>{
            commit('mut_hot_word', d)
            commit('mut_hotWord_success', false)
        })
    },
    ac_hot_word_remove({commit}, param) {
        // eslint-disable-next-line
        $axios.delete('/api/admin/hotWord/remove', {
            params: param
        }).then((res)=>{
            if (res.status === 200) {
                commit('mut_hotWord_success', true)
            }
        })
    },
    ac_gift_list({commit}) { // 礼物列表获取
        // eslint-disable-next-line
        $axios.get('/api/admin/present/list').then((res)=>{
            return res.data
        }).then((d)=>{
            commit('mut_gift_list', d.data)
            commit('mut_gift_success_back', false)
        })
    },
    ac_gift_remove({commit}, param) { // 礼物删除
        // eslint-disable-next-line
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
        // eslint-disable-next-line
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
        // eslint-disable-next-line
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
    ac_live_detail({commit}, param) { // 单个直播信息
        // eslint-disable-next-line
        $axios.get('/api/admin/play/get/'+param.videoId).then(res=>{
            return res.data
        }).then(d=>{
            commit('mut_live_detail', d.data)
        })
    },
    ac_live_report_detail({commit}, param) { // 单个直播举报信息
        // eslint-disable-next-line
        $axios.get('/api/admin/play/get/'+param.videoId).then(res=>{
            return res.data
        }).then(d=>{
            commit('mut_live_report_detail', d.data)
        })
    },
    ac_disable_chartroom({commit}, param) { // 禁用聊天室
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/play/disableChatRoom/'+param.videoId,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_disable_live({commit}, param) { // 中断直播
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/play/disableLive/'+param.videoId,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_disable_play({commit}, param) { // 禁播
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/play/disablePlay/'+param.videoId,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_live_edit({commit}, param) { // 修改
        // eslint-disable-next-line
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
    },
    ac_live_play_enable({commit}, param) { // 解除禁播
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/play/enablePlay/'+param.videoId,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_chatroom_enable({commit}, param) { // 解禁聊天室
        // eslint-disable-next-line
        $axios({
            method: 'post',
            url: '/api/admin/play/ebableChatRoom/'+param.videoId,
            headers: {"Content-Type": "application/json"},
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_live_success_back', true)
            }
        })
    },
    ac_live_report_list({commit}, param) { // 获取对单个直播的举报列表
        // eslint-disable-next-line
        $axios({
            method: 'get',
            url: '/api/admin/expose/listByLive/'+param.videoId,
            headers: {"Content-Type": "application/json"},
            params: {
                pageIndex: param.pageIndex,
                pageSize: param.pageSize
            }
        }).then(res=>{
            return res.data
        }).then(d=>{
            commit('mut_live_report_list', d.data.data)
            commit('mut_live_report_total', d.data.total)
        })
    }
}
