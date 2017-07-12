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
    }
}
