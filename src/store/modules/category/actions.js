/**
 * Created by allen on 17-4-14.
 */
// import axiosConfig from '../../../utils/axios_config'
//
// let install = $axios.create(axiosConfig)

export default {

    ac_classify_list({commit}, param) { // 分类列表
        $axios.get('/api/admin/category/list', {
            params: param
        }).then((res)=>{
            // console.log('分类列表',res)
            return res.data.data
        }).then( (d)=> {
            commit('mut_classify_lists', d.data)
            commit('mut_classify_total', d.total)
            commit('del_classify_success_back', false)
        })
    },

    // 添加分类
    ac_add_classify({commit}, param) {

        // console.log("添加分类action",param)
        $axios({
            method: 'post',
            url: '/api/admin/category/add',
            headers: {"Content-Type":"application/json;charset=UTF-8"},
            data: JSON.stringify(param)
        }).then((res)=>{
            if (res.status === 200) {
                commit('mut_edit_classify_success', 1)
            } else {
                commit('mut_edit_classify_success', 0)
            }
        })
    },

    // 删除一级分类
    ac_del_classify({commit}, param) {

        $axios({
            method: 'delete',
            url: '/api/admin/category/remove',
            params: param,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then((res)=>{
            if (res.status === 200) {
                commit('del_classify_success_back', true)
            } else {
                commit('del_classify_success_back', false)
            }
        })
    },

    // 修改分类
    ac_modify_classify({commit}, param) {
        let p = {};

        Object.keys(param).forEach((key)=>{
            if (param[key].length) {
                p[key] = param[key]
            }
        })
        p.id = param.id;
        // console.log('修改分类', p)

        $axios({
            method: 'post',
            url: '/api/admin/category/modify',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            data: JSON.stringify(p)
        }).then((res)=>{
            // console.log(res)
            if (res.status === 200) {
                // commit('mut_edit_classify_success', 616)
                commit('mut_edit_classify_success', 1)
            }  else if (res.status === 500) {
                commit('mut_edit_classify_success', 616)
            } else {
                commit('mut_edit_classify_success', 0)
            }
        })
    },
    ac_add_tags({commit}, param) {
        console.log(JSON.stringify(param))
        $axios({
            method: 'post',
            headers: {"Content-Type":"application/json"},
            url: '/api/admin/label/add',
            params: param
            // data: JSON.stringify(param)
        }).then((res)=>{
            if (res.status === 200) {
                commit('mut_tags_success_back', true)
            }
        })
    },

    ac_tags_list({commit}) {
        $axios.get('api/admin/label/list').then((res)=>{
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
            url: '/api/admin/label/remove',
            params: param
        }).then((res)=>{
            if (res.status === 200) {
                commit('mut_tags_success_back', true)
            }
        })
    }
}
