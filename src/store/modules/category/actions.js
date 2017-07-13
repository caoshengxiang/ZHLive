/**
 * Created by allen on 17-4-14.
 */
import { getUrl } from '../../../utils/utils'

export default {
    ac_classify_list({commit}, param) {
         $axios.get(getUrl('/api/admin/category/list', param)).then((res)=>{
             return res.data.data
         }).then( (d)=> {
             commit('mut_classify_lists', d)
         })
    },
    ac_add_tags({commit}, param) {
        console.log(JSON.stringify(param))
        $axios({
            method: 'post',
            headers: {"Content-Type":"application/json"},
            url: '/api/admin/label/add',
            data: JSON.stringify(param)
        }).then((res)=>{
            if (res.status === 200) {
                commit('mut_tags_success_back', true)
            }
        })
    },
    ac_tags_list({commit}) {
        $axios.get(getUrl('/api/admin/label/list')).then((res)=>{
            return res.data.data
        }).then((d)=>{
            commit('mut_tags', d)
            commit('mut_tags_success_back', false)
        })
    },
    ac_del_tags({commit}, param) {
        $axios({
            method: 'delete',
            headers: {"Content-Type": "application/json"},
            url: getUrl('/api/admin/label/remove', param)
        }).then((res)=>{
            if (res.status === 200) {
                commit('mut_tags_success_back', true)
            }
        })
    }
}
