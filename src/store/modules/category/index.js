/**
 * Created by allen on 17-4-14.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'


export default {
    namespaced: true,
    state: {
        classifyLists: [],
        classifyTotal: 0,
        editSuccess: 0, // 编辑分类成功返回
        delClassifySuccessBack: false, // 删除分类成功返回
        tags: [],
        tagsSuccessBack: false
    },
    getters,
    actions,
    mutations,
}
