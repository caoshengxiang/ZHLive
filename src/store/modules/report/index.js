/**
 * Created by allen on 17-4-14.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'


export default {
    namespaced: true,
    state: {
        reportList: [], // 举报数据列表
        reportTotal: 0,
        feedbackList: [], // 反馈数据列表
        feedbackTotal: 0,
        successBack: false, // 举报和反馈操作成功返回
    },
    getters,
    actions,
    mutations,
}
