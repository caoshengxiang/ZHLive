<template>
    <div>
        <div class="top">12</div>
        <div class="con">
            <table>
                <tr>
                    <th>用户编号</th>
                    <th>头像</th>
                    <th>昵称</th>
                    <th>手机</th>
                    <th>注册时间</th>
                    <th>年龄</th>
                    <th>性别</th>
                    <th>实名认证</th>
                    <th>个人简历</th>
                    <th>操作</th>
                </tr>
                <tr class="d" v-for="item in tableData">
                    <td>{{item.number}}</td>
                    <td></td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.tel}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.sex}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.intro}}</td>
                    <td class="op">
                        <button @click="showAccount(item)">查看</button>
                        <button @click="editAccount(item)">编辑</button>
                        <button @click="disableAccount(item)" :class="{able: item.disable}">禁用</button>
                    </td>
                </tr>
            </table>
            <div class="page">
                <el-pagination
                        layout="prev, pager, next, jumper"
                        :total="500"
                        @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'accountManagement',
        props: {},
        data() {
            return {
                total: 500,
                tableData: [
                    {id: 1,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 2,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: true},
                    {id: 3,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 4,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 5,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 6,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 7,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 8,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 9,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                    {id: 10,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '', age: 19, sex: '男', name: '李小', intro: '你好', disable: false},
                ]
            }
        },
        computed: {},
        methods: {
            handleCurrentChange(item) { // 分页
                this.$router.push({name: 'accountManagement', params: {page: item}})
            },
            showAccount(item) {
                this.$router.push({name: 'accountShow', params: {id: item.id}})
            },
            editAccount(item) {
                this.$router.push({name: 'accountEdit', params: {id: item.id}})
            },
            disableAccount(item) {
                if (item.disable) { // 已被禁用
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                } else {
                    this.$confirm('确认禁用此用户?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '禁用成功!'
                        });
                    }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                    });
                }
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../styles/mixin";
    .top {
        @include top-box;
    }
    .con {
        /*border: 1px solid red;*/

        table {
            padding: 20px;
            width: 100%;
            tr {
                th {
                    @include table-tr;
                    text-align: center;
                    font-size: 14px;
                }
                td {
                    @include table-tr;
                    text-align: center;
                    overflow: hidden;
                    font-size: 14px;
                }
                .op {
                    button {
                        margin: 0 3px;
                        font-size: 14px;
                        @include table-button;
                        &:nth-child(1) {
                            background: #00d4ff;
                        }
                        &:nth-child(2) {
                            background: #ff6e00;
                        }
                        &:nth-child(3) {
                            background: #000000;
                            &.able {
                                background: #9b9393;
                            }
                        }

                    }
                }
            }
            .d {
                border-bottom: 1px solid #ccc;
            }
        }
        .page {
            text-align: center;
            margin-top: 30px;
        }
    }
</style>