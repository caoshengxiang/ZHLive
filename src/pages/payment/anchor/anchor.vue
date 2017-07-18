<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item" @click="userWealthPage">用户财富管理</div>
                <div class="con-col-item  con-col-active" @click="anchorIncomePage">主播收入明细</div>
                <div class="con-col-item" @click="userCashPage">账号提现申请</div>
            </div>

            <div class="search">
                <el-input
                        placeholder="用户昵称"
                        icon="search"
                        v-model="searchValue"
                        :on-icon-click="handleSearchClick">
                </el-input>
            </div>
        </div>
        <div class="con-table">
            <table>
                <tr>
                    <th>用户编号</th>
                    <th>头像</th>
                    <th>昵称</th>
                    <th>手机</th>
                    <th>实名认证</th>
                    <th>总收入(魂币)</th>
                    <th>收入余额(魂豆)</th>
                    <th>操作</th>
                </tr>
                <tr class="border-bottom">
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td class="td-op">
                        <button class="b-1" @click="editOverage">编辑余额</button>
                        <button class="b-2" @click="incomeDetail">收入明细</button>
                    </td>
                </tr>
            </table>
        </div>


        <div class="dialog">
            <!-- 编辑余额 -->
            <el-dialog title="余额编辑" :visible.sync="overageDialogFormVisible">
                <div class="overage">
                    <el-input></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="overageDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="overageDialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>


            <!-- 收入明细 -->
            <el-dialog :visible.sync="incomeDialogFormVisible" :show-close="false">
                <div class="income">
                    <el-table :data="incomeDetailData.list">
                        <el-table-column property="time" label="收入时间" width="150"></el-table-column>
                        <el-table-column property="project" label="收入项目" width="100"></el-table-column>
                        <el-table-column property="manageName" label="消费主播" width="130"></el-table-column>
                        <el-table-column property="manageId" label="主播编号" width="100"></el-table-column>
                        <el-table-column property="h" label="收入金额"></el-table-column>
                    </el-table>
                </div>

                <div class="con-page">
                    <el-pagination
                            @size-change="incomeDialogHandleSizeChange"
                            @current-change="incomeDialogHandleCurrentChange"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                    </el-pagination>
                </div>

                <div slot="title" class="income-title">
                    <h1>用户昵称 (1) 消费明细</h1>
                    <p>总充值: 8888</p>
                    <i class="el-icon-close" @click="closeIncomeDialog"></i>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>

    export default {
        name: '',
        props: {},
        data() {
            return {
                searchValue: '',
                overageDialogFormVisible: false, // 编辑余额dialog
                incomeDialogFormVisible: false, // 收入明细
                incomeDetailData: {
                    total: 888,
                    list: [
                        {time: '2017-01-01 10:11', project: '打赏', manageName: 'nicheng', manageId: 1, h: 1},
                        {time: '2017-01-01 10:11', project: '打赏', manageName: 'nicheng', manageId: 1, h: 1},
                        {time: '2017-01-01 10:11', project: '打赏', manageName: 'nicheng', manageId: 1, h: 1},
                        {time: '2017-01-01 10:11', project: '打赏', manageName: 'nicheng', manageId: 1, h: 1},
                    ]
                }
            }
        },
        computed: {},
        methods: {
            userWealthPage() {
                this.$router.push({name: 'paymentManage'})
            },
            anchorIncomePage() {
                this.$router.push({name: 'paymentAnchor'})
            },
            userCashPage() {
                this.$router.push({name: 'paymentCash'})
            },
            handleSearchClick() {

            },
            editOverage() {
                this.overageDialogFormVisible = true
            },
            incomeDialogHandleSizeChange() {

            },
            incomeDialogHandleCurrentChange() {

            },
            closeIncomeDialog() {
                this.incomeDialogFormVisible = false
            },
            incomeDetail() {
                this.incomeDialogFormVisible = true
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
    @import "../../../styles/common";
    .td-op {
        .b-1 {
            background: #ff6e00;
        }
        .b-2 {
            background: #ff00aa;
        }
    }

    .dialog {
        .income-title {
            text-align: center;
            position: relative;
        }
        .el-icon-close {
            position: absolute;
            top: 0;
            right: 0;
            background: #ffb600;
            color: #fff;
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
        }
    }
</style>