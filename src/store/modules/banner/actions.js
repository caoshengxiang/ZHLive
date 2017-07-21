/**
 * Created by allen on 17-4-14.
 */
// import axiosConfig from '../../../utils/axios_config'
//
// let install = $axios.create(axiosConfig)

export default {
    ac_banner_list({commit}, param) { // banner列表
        $axios.get('/api/admin/banner/list/'+param.category).then(res=>{
            return res.data
        }).then(d=>{
            commit('mut_banner_list', d.data)
            commit('mut_banner_success_back', false)
        })
    },
    ac_banner_disable({commit}, param) { // banner显示隐藏
        $axios({
            method: 'post',
            url: '/api/admin/banner/disable/'+param.id+'/'+param.show,
            headers: {"Content-Type": "application/json"}
        }).then(res=>{
            if (res.status === 200) {
                commit('mut_banner_success_back', true)
            }
        })
    },
    ac_banner_detail({commit}, param) { // banner详细
        $axios.get('/api/admin/banner/get/'+param.id).then(res=>{
            return res.data
        }).then(d=>{
            commit('bannerDetail', d.data)
            commit('mut_banner_success_back', false)
        })
    },
    ac_banner_edit({commit}, param) { // banner编辑
        $axios({
            method: 'post',
            url: '/api/admin/banner/modify'+param.category,
            data: JSON.stringify(param),
            headers: {"Content-Type": "application/json"}
        })
    }
}
