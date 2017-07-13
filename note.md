# 遇到的问题
1. vuex提交dispatch时一个请求成功返回后提交下一个请求
> 在dispatch().then()请求不是在成功返回后请求，添加第二个请求参数，dispatch(‘’， param1, param2), 在
action成功回调请求
> dispatch传第二个参数是未定义，所以放在一个对象里面

# 问题

