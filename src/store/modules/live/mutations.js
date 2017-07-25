/**
 * Created by allen on 17-4-14.
 */

export default {
    mut_hot_word(st, data) { // 热词
        st.hotWord = data;
    },
    mut_hotWord_success(st, data) {
        st.hotWordSuccess = data
    },
    mut_gift_list(st, data) {
        st.giftsList = data
    },
    mut_gift_success_back(st, data) {
        st.gitEditSuccess = data
    },
    mut_live_list(st, data) {
        st.liveList = data
    },
    mut_live_detail(st, data) {
        st.liveDetail = data
    },
    mut_live_total(st, data) {
        st.liveTotal = data
    },
    mut_live_success_back(st, data) {
        st.liveSuccessBack = data
    }
}
