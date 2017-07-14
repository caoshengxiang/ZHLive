/**
 * Created by allen on 17-7-13.
 */

import Qs from 'qs'
export default {

    // 请求头信息
    headers: {'Content-Type': 'application/json;charset=UTF-8'},


    //设置超时时间
    timeout: 1000,

    //  “responseType”表示服务器响应的数据类型
    //  选项是'arraybuffer'，'blob'，'document'，'json'，'text'，'stream'
    responseType: 'json', // default
}