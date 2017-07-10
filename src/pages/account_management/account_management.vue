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
                <tr class="d" v-for="(item, index) in tableData">
                    <td>{{index + 1 + (currentPage-1)*10 }}</td>
                    <td><img :src="item.icon" alt="头像"></td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.phoneNum}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.gender === 'MALE'? '男':'女'}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.signature}}</td>
                    <td class="op" v-if="dropDownMenuItem === 0">
                        <button class="item0" @click="showAccount(item)">查看</button>
                        <button class="item0-1" @click="editAccount(item)">编辑</button>
                        <button class="item0-2" @click="disableAccount(item)" :class="{able: item.status==='ACTIVE'?false:true}">
                            {{item.status === 'ACTIVE' ? '禁用':'解禁'}}
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
                        :total="total"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
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
        computed: {
            tableData() {
                return this.$store.state.account.accountLists;
            },
            total() {
                return this.$store.state.account.total;
            },
            currentPage() {
                return parseInt(this.$route.params.page, 10)
            }
        },
        methods: {
            handleCurrentChange(item) { // 分页
                this.$router.push({name: 'accountManagement', params: {page: item}})
                console.log('请求数据第'+item +'页');

                // 请求第几页数据
                this.getUserLists(parseInt(this.$route.params.type, 10) + 1, item - 1, 10)
            },
            showAccount(item) {
                console.log(item)
                this.$router.push({name: 'accountShow', params: {id: item.userId}})
            },
            editAccount(item) {
                this.$router.push({name: 'accountEdit', params: {id: item.userId}})
            },
            disableAccount(item) {
                let param2 = {
                    type: parseInt(this.$route.params.type, 10) + 1,
                    pageIndex: parseInt(this.$route.params.page, 10) - 1,
                    pageSize: 10
                }

                if (item.status === 'ACTIVE') { // 启用状态
                    this.$confirm('确认禁用此用户?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$store.dispatch('account/ac_disableUser', {
                            param1: {
                                userId: item.userId
                            },
                            param2: param2
                        })
                    }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                    });
                } else { // 禁用状态
                    this.$store.dispatch('account/ac_enableUser', {
                        param1: {
                            userId: item.userId
                        },
                        param2: param2
                    })
                }
            },
            showDisableAccount(item){
                this.$router.push({name: 'showDisable', params: {id: item.userId}})
            },
            endDisableAccount(item) { // 解禁
                let param2 = {
                    type: parseInt(this.$route.params.type, 10) + 1,
                    pageIndex: parseInt(this.$route.params.page, 10) - 1,
                    pageSize: 10
                }
                
                this.$store.dispatch('account/ac_enableUser', {
                    param1: {
                        userId: item.userId
                    },
                    param2: param2
                })
            },
            showLiveAccount(item) {
                this.$router.push({name: 'accountShow', params: {id: item.userId}})
            },
            delLiveAccount() {
            },
            showApplyLiveAccount(item) {
                this.$router.push({name: 'showLiveApply', params: {id: item.userId}})
            },
            passApply() {
            },
            refuseApply() {
            },
            handleCommand(va) {
                this.dropDownMenuItem = parseInt(va, 10);
                this.$router.push({name: 'accountManagement', params: {type: va, page: 1}})
                this.getUserLists(this.dropDownMenuItem + 1, 0, 10)
            },
            handleSearchClick() {
                this.getUserLists(this.dropDownMenuItem + 1, 0, 10, this.searchValue)
            },
            getUserLists(type, page, size, search) {
                let param;

                param = {
                    type: type,
                    pageIndex: page,
                    pageSize: size
                }

                if (search) {
                    param.search = search
                }
                this.$store.dispatch('account/ac_accountLists', param)
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            // 初始请求所用用户列表数据
            this.getUserLists(parseInt(this.$route.params.type, 10) + 1, parseInt(this.$route.params.page, 10) - 1, 10)
            this.dropDownMenuItem  = parseInt(this.$route.params.type, 10)
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
<style lang="scss" rel="stylesheet/scss" scoped>
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