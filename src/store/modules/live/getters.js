/**
 * Created by allen on 17-4-14.
 */

export default {
    getter_liveReportList(st) {
        return st.liveReportList.map(item=>{
            switch (item.type) {
                case 'ADVERTISINGFRAUD':
                    item.content = '广告欺诈'
                    break;
                case 'OBSCENEPORNOGRAPHY':
                    item.content = '淫秽色情'
                    break;
                case 'HARASSMENT':
                    item.content = '骚扰谩骂'
                    break;
                case 'REACTIONARYPOLITICS':
                    item.content = '反动政治'
                    break;
                case 'OTHER':
                    item.content = '其他'
                    break;
                default:
                    item.content = '其他'
            }
            return item
        })
    }
}
