/**
 * Created by allen on 17-4-14.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'


export default {
    namespaced: true,
    state: {
        total: 0, // 账户数量
        accountLists: [],
        userInfo: {},
        successBack: false, // 接口成功返回
        sysMsg: [], // 系统消息
        chatRoomMsg: [], // 聊天室消息,
        msgTotal: 0, // 消息总数
    },
    getters,
    actions,
    mutations,
}
