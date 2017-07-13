/**
 * Created by allen on 17-4-14.
 */

export default {
    edit_classify_detail(st, id) {
        // console.log('getter',st.classifyLists)
        return st.classifyLists.map((item)=>{
            // if (item.id === id) {
            //     console.log(item)
                return item
            // }
        })
    }
}
