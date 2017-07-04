/**
 * Created by allen on 17-7-4.
 */
var path = require('path');
module.exports = {
    dev: {
        host: 'localhost',  // 主机或IP
        port: 8888, // 设置端口号
        assetsPublicPath: '',
        contentBase: path.join(__dirname, '/../dist'),
        proxyTable: { // 设置代理服务器
            '/web/*': {
                target: 'http://192.168.1.21:9090',
                secure: false
            },
        }
    },
    build: {

    }

}
