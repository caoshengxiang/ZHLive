/**
 * Created by allen on 17-4-14.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'


export default {
    namespaced: true,
    state: {
        hotWord: [],
        hotWordSuccess: false, // 热词删除或添加成功返回
        giftsList: [], // 礼物列表
        gitEditSuccess: false, // 编辑礼物成功返回
    },
    getters,
    actions,
    mutations,
}
