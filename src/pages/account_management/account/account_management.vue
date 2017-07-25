<template>
    <div>
        <div class="con-top">
            <div class="con-col">
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

                <div class="con-col-item" @click="showMessagePage">系统消息</div>
                <div class="con-col-item" @click="showChatroomPage">聊天室公共消息</div>
            </div>

            <div class="search">
                <el-input
                        placeholder="用户昵称/手机号"
                        icon="search"
                        v-model="searchValue"
                        :on-icon-click="handleSearchClick">
                </el-input>
            </div>
        </div>
        <div class="con-table">
            <table>
                <tr>
                    <th width="70px">用户编号</th>
                    <th width="50px">头像</th>
                    <th>昵称</th>
                    <th>手机</th>
                    <th width="120px">注册时间</th>
                    <th width="50px">年龄</th>
                    <th width="50px">性别</th>
                    <th>实名认证</th>
                    <th>个人简历</th>
                    <th width="25%">操作</th>
                </tr>
                <tr class="border-bottom" v-for="(item, index) in tableData" :key="index">
                    <td>{{ item.userId }}</td>
                    <td><img class="head-img" :src="item.icon" alt="头像"></td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.phoneNum}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.gender === 'MALE'? '男':'女'}}</td>
                    <td>{{item.name}}</td>
                    <td style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;text-align: left">{{item.signature}}</td>
                    <td class="td-op" v-if="dropDownMenuItem === 0">
                        <button class="item0" @click="showAccount(item)">查看</button>
                        <button class="item0-1" @click="editAccount(item)">编辑</button>
                        <button class="item0-2" @click="disableAccount(item)"
                                :class="{able: item.status==='ACTIVE'?false:true}">
                            {{item.status === 'ACTIVE' ? '禁用':'解禁'}}
                        </button>
                    </td>
                    <td class="td-op" v-if="dropDownMenuItem === 1">
                        <button class="item1" @click="showDisableAccount(item)">查看</button>
                        <button class="item1-1" @click="endDisableAccount(item)"> 解禁</button>
                    </td>
                    <td class="td-op" v-if="dropDownMenuItem === 2">
                        <button class="item2" @click="showLiveAccount(item)">查看</button>
                        <button class="item2-1" @click="editCommission(item)">提成比例{{item.commission}}%</button>
                        <button class="item2-2" @click="delLiveAccount(item)"> 移除主播</button>
                    </td>
                    <td class="td-op" v-if="dropDownMenuItem === 3">
                        <button class="item3" @click="showApplyLiveAccount(item)">查看</button>
                        <button class="item3-1" @click="passApply(item)"> 通过</button>
                        <button class="item3-2" @click="rejectApply(item)"> 拒绝</button>
                    </td>
                </tr>
            </table>
            <div class="con-page">
                <el-pagination
                        v-if="total > 10"
                        layout="prev, pager, next, jumper"
                        :total="total"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                >
                </el-pagination>
            </div>
        </div>

        <!-- 编辑提成比例 -->
        <div class="dialog">
            <el-dialog :visible.sync="commissionDialogFormVisible" :show-close="false">
                <div class="commission">
                    <input type="number" v-model="commissionData.commission"><span>%</span>
                </div>
                <div slot="title">
                    <div class="title">
                        <h3>{{commissionData.nickname}}</h3>
                        <h3>提成比例</h3>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <div class="footer">
                        <el-button @click="commissionDialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="commissionSave">确 定</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'accountManagement',
        props: {},
        data() {
            return {
                dropDownMenu: ['全部用户', '禁用用户', '全部主播', '主播申请列表'],
                dropDownMenuItem: 0,
                searchValue: '',
                commissionDialogFormVisible: false,
                commissionData: {}
            }
        },
        watch: {
            '$route.params.type'(va) {
                console.log('请求数据' + va)
            },
            successBack(me) {
                if (me) {
                    this.getUserLists(parseInt(this.$route.params.type, 10) + 1, this.$route.params.page, 10)
//                    this.$message({
//                        type: 'success',
//                        message: '删除成功!'
//                    });
                }
            }
        },
        computed: {
            ...mapState('account', [
                'successBack',
                'total'
            ]),
            tableData() {
                return this.$store.state.account.accountLists;
            },
            currentPage() {
                return parseInt(this.$route.params.page, 10)
            }
        },
        methods: {
            ...mapActions('account', [
                'ac_modify_commission',
                'ac_remove_anchor',
                'ac_pass_apply',
                'ac_reject_apply'
            ]),
            handleCurrentChange(item) { // 分页
                this.$router.push({name: 'accountManagement', params: {page: item}})
                console.log('请求数据第' + item + '页');

                // 请求第几页数据
                this.getUserLists(parseInt(this.$route.params.type, 10) + 1, item, 10)
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
                    pageIndex: parseInt(this.$route.params.page, 10),
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
                    pageIndex: parseInt(this.$route.params.page, 10),
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
            delLiveAccount(item) {
                this.$confirm('确认移除主播, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ac_remove_anchor(item)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editCommission(item) {
                this.commissionDialogFormVisible = true
                this.commissionData = item
            },
            showApplyLiveAccount(item) {
                this.$router.push({name: 'showLiveApply', params: {id: item.userId}})
            },
            passApply(item) { // 通过主播申请
                this.ac_pass_apply(item)
            },
            rejectApply(item) { // 拒绝主播申请
                this.ac_reject_apply(item)
            },
            handleCommand(va) {
                this.dropDownMenuItem = parseInt(va, 10);
                this.$router.push({name: 'accountManagement', params: {type: va, page: 1}})
                this.getUserLists(this.dropDownMenuItem + 1, 1, 10)
            },
            handleSearchClick() {
                this.getUserLists(this.dropDownMenuItem + 1, 1, 10, this.searchValue)
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
            },

            showMessagePage() { // 跳转系统消息页面
                this.$router.push({name: 'message', params: {page: 1}})
            },
            showChatroomPage() { // 跳转聊天室页面
                this.$router.push({name: 'chatroom', params: {page: 1}})
            },
            commissionSave() { // 修改比例
                this.ac_modify_commission(this.commissionData)
                this.commissionData = {}
                this.commissionDialogFormVisible = false
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            // 初始请求所用用户列表数据
            this.getUserLists(parseInt(this.$route.params.type, 10) + 1, parseInt(this.$route.params.page, 10), 10)
            this.dropDownMenuItem = parseInt(this.$route.params.type, 10)
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
    @import "../../../styles/common";

    .con-table {
        .head-img {
            width: 24px;
            height: 24px;
        }

        .td-op {
            button {
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
                    background: #ffbb00;
                    width: 100px;
                    padding: 3px 3px;
                }
                &.item2-2 {
                    background: red;
                    padding: 3px 6px;
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

    .dialog {
        .title {
            text-align: center;
            h3 {
                margin-bottom: 10px;
            }
        }
        .commission {
            text-align: center;
            input {
                font-size: 24px;
                padding: 20px 10px;
                width: 100px;
                border-radius: 5px;
                border: 1px solid #ccc;
                margin-right: 8px;
            }
            span {
                font-size: 24px;
            }
        }
        .footer {
            text-align: center;
        }
    }
</style>