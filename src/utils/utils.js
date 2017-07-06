/**
 * Created by allen on 17-7-5.
 */
// 日期计算年龄
export function date2age(time) {
    let y,
        nowY;

    y = time.getFullYear();
    nowY = new Date().getFullYear();
    return nowY - y;
}

// 格式化时间 yyyy-mm-dd
export function yyyymmdd(time) {
    let y,
        m,
        d;

    console.log(time)
    y = time.getFullYear();
    m = time.getMonth() >= 9 ? time.getMonth() +1 : '0'+(time.getMonth() +1);
    d = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();

    return y + '-' + m + '-' + d
    // return new Date(time).toISOString().slice(0,10)
}