/**
 * Created by allen on 17-4-14.
 */

export default {
    getters_userInfo(st) {
        let obj;

        obj = Object.assign({}, st.userInfo)
        obj.gender === 'MALE'?obj.gender = '男':obj.gender = '女';
        return obj;
    }
}
