<template>
    <div>
        <div class="top">
            <div class="drop-down"></div>
            <el-dropdown
                    trigger="click"
                    @command="handleCommand">
                <el-button type="primary">
                    {{dropDownMenu[dropDownMenuItem]}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                            v-for="(item, i) in dropDownMenu"
                            :command="i.toString()">{{item}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <div class="search">
                <el-input
                        placeholder="用户昵称/手机号"
                        icon="search"
                        v-model="searchValue"
                        :on-icon-click="handleSearchClick">
                </el-input>
            </div>
        </div>
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
                    <td class="op" v-if="dropDownMenuItem === 0">
                        <button class="item0" @click="showAccount(item)">查看</button>
                        <button class="item0-1" @click="editAccount(item)">编辑</button>
                        <button class="item0-2" @click="disableAccount(item)" :class="{able: item.disable}">
                            {{item.disable==true ? '解禁':'禁用'}}
                        </button>
                    </td>
                    <td class="op" v-if="dropDownMenuItem === 1">
                        <button class="item1" @click="showDisableAccount(item)">查看</button>
                        <button class="item1-1" @click="endDisableAccount(item)"> 解禁</button>
                    </td>
                    <td class="op" v-if="dropDownMenuItem === 2">
                        <button class="item2" @click="showLiveAccount(item)">查看</button>
                        <button class="item2-1" @click="delLiveAccount(item)"> 移除主播</button>
                    </td>
                    <td class="op" v-if="dropDownMenuItem === 3">
                        <button class="item3" @click="showApplyLiveAccount(item)">查看</button>
                        <button class="item3-1" @click="passApply(item)"> 通过</button>
                        <button class="item3-2" @click="refuseApply(item)"> 拒绝</button>
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
                    {
                        id: 1,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 2,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: true
                    },
                    {
                        id: 3,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 4,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 5,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 6,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 7,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 8,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 9,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                    {
                        id: 10,
                        number: '000001',
                        headImg: '',
                        nickname: 'allen',
                        tel: '17744332211',
                        time: '',
                        age: 19,
                        sex: '男',
                        name: '李小',
                        intro: '你好',
                        disable: false
                    },
                ],
                dropDownMenu: ['全部用户', '禁用用户', '全部主播', '主播申请列表'],
                dropDownMenuItem: 0,
                searchValue: '',
            }
        },
        watch: {
            '$route.params.type'(va) {
                console.log('请求数据'+ va)
            }
        },
        computed: {},
        methods: {
            handleCurrentChange(item) { // 分页
                this.$router.push({name: 'accountManagement', params: {page: item}})
                console.log('请求数据第'+item +'页');
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
            },
            showDisableAccount(item){
                this.$router.push({name: 'showDisable', params: {id: item.id}})
            },
            endDisableAccount() {
            },
            showLiveAccount(item) {
                this.$router.push({name: 'showLiveUser', params: {id: item.id}})
            },
            delLiveAccount() {
            },
            showApplyLiveAccount(item) {
                this.$router.push({name: 'showLiveApply', params: {id: item.id}})
            },
            passApply() {
            },
            refuseApply() {
            },
            handleCommand(va) {
                this.dropDownMenuItem = parseInt(va, 10);
                this.$router.push({name: 'accountManagement', params: {type: va, page: 1}})

            },
            handleSearchClick() {
                alert(1)
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            console.log('请求数据'+this.$route.params.type, this.$route.params.page);
            this.$store.dispatch('account/ac_accountLists', {
                type: this.$route.params.type,
                pageIndex: this.$route.params.page,
                pageSize: 10
            })
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
        display: flex;
        align-items: center;
        .drop-down {
            margin-left: 20px;
        }
        .search {
            width: 150px;
            /*height: 25px;*/
            margin: 0 auto;

        }
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
                        &.item0, &.item1, &.item2, &.item3 {
                            background: #00d4ff;
                        }
                        &.item0-1 {
                            background: #ff6e00;
                        }
                        &.item0-2 {
                            background: #000000;
                            &.able {
                                background: #9b9393;
                            }
                        }
                        &.item1-1 {
                            background: #9b9393;
                        }
                        &.item2-1 {
                            background: red;
                        }
                        &.item3-1 {
                            background: green;
                        }
                        &.item3-2 {
                            background: red;
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

        .el-button--primary {
            background: #605d5d;
            border-color: #605d5d;
        }
        .el-button {
            padding: 10px 20px;
            width: 150px;
        }
        .el-input__inner:focus {
            border-color: #ccc !important;
        }
    }
</style>