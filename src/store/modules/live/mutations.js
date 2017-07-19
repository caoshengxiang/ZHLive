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
    }
}
