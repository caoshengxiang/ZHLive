/**
 * Created by allen on 17-4-14.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'


export default {
    namespaced: true,
    state: {
        bannerList: [],
        successBack: false, // banner操作成功返回
        bannerDetail: {}
    },
    getters,
    actions,
    mutations,
}
