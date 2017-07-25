/**
 * Created by allen on 17-4-14.
 */


export default {
    ac_feedback_list({commit}, param) { // 反馈
        $axios.get('/api/admin/feedback/list', {
            params: param
        }).then(res=>{
            return res.data
        }).then(d=>{
            commit('mut_feedback_list', d.data.data)
            commit('mut_feedback_total', d.data.total)
            commit('mut_success_back', false)
        })
    },
    ac_feedback_remove({commit}, param) { // 删除反馈
        $axios({
            method: 'delete',
            url: '/api/admin/feedback/remove/'+param.id,
            headers: {"Content-Type": "application/json"}
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_success_back', true)
            }
        })
    },

    ac_report_list({commit}, param) { // 举报
        $axios.get('/api/admin/expose/list', {
            params: param
        }).then(res=>{
            return res.data
        }).then(d=>{
            commit('mut_report_list', d.data.data)
            commit('mut_report_total', d.data.total)
            commit('mut_success_back', false)
        })
    },
    ac_report_remove({commit}, param) {
        $axios({
            method: 'delete',
            url: '/api/admin/expose/remove/' + param.id,
            headers: {"Content-Type": "application/json"}
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_success_back', true)
            }
        })
    }
}
