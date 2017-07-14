/**
 * Created by allen on 17-4-14.
 */

export default {
    mut_classify_lists(st, data) {
        st.classifyLists = data
    },
    mut_classify_total(st, data) {
        st.classifyTotal = data
    },
    mut_edit_classify_success(st, data) {
        st.editSuccess = data
    },
    del_classify_success_back(st, data) {
        st.delClassifySuccessBack = data
    },
    mut_tags(st, data) {
        st.tags = data
    },
    mut_tags_success_back(st, data) {
        st.tagsSuccessBack = data
    }
}
