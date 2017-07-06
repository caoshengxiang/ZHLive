/**
 * Created by allen on 17-4-14.
 */

export default {
    ac_user ({commit}, param) {
        // ajax
        console.log('dispatch', param)

        sessionStorage.user = param.name;
        commit('mut_user', param.name)
    },
    ac_t() {
        console.log('bbbbbbbbbbbbbb')
    }
}
