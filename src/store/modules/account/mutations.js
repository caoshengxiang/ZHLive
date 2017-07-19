/**
 * Created by allen on 17-4-14.
 */

export default {
    mut_total(st, data) { // 用户数量
        st.total = data
    },
    mut_account_Lists(st, data) {
        st.accountLists = data
    },
    mut_userInfo(st, data) {
        st.userInfo = data
    },
    mut_success_back(st, data) {
        st.successBack = data
    },
    mut_sys_msg(st, data) {
        st.sysMsg = data
    },
    mut_chatroom_msg(st, data) {
        st.chatRoomMsg = data
    },
    mut_msg_total(st, data) {
        st.msgTotal = data
    }
}
