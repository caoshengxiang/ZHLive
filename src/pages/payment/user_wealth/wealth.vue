<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item con-col-active" @click="userWealthPage">用户财富管理</div>
                <div class="con-col-item" @click="anchorIncomePage">主播收入明细</div>
                <div class="con-col-item" @click="userCashPage">帐号提现申请</div>
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
                    <th>余额(魂币)</th>
                    <th>总充值(RMB)</th>
                    <th>总收入(魂币)</th>
                    <th>总支出(魂币)</th>
                    <th width="30%">操作</th>
                </tr>
                <tr class="border-bottom">
                    <td>1</td>
                    <td>2</td>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td class="td-op">
                        <button class="b-1" @click="editOverage">编辑余额</button>
                        <button class="b-2" @click="rechargeDetail">充值明细</button>
                        <button class="b-3" @click="consumeDetail">消费明细</button>
                    </td>
                </tr>
            </table>
        </div>


        <div class="dialog">
            <!-- 编辑余额 -->
            <el-dialog :visible.sync="overageDialogFormVisible" :show-close="false">
                <div class="overage">
                    <el-input></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="overageDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="overageDialogFormVisible = false">确 定</el-button>
                </div>
                <div slot="title" class="balance-title">
                    余额编辑(魂币)
                    <i class="el-icon-close" @click="closeEditDialog"></i>
                </div>
            </el-dialog>

            <!-- 充值明细 -->
            <el-dialog :visible.sync="rechargeDialogFormVisible" :show-close="false">
                <div class="recharge">
                    <el-table :data="rechargeDetailData.list">
                        <el-table-column property="time" label="日期" width="150"></el-table-column>
                        <el-table-column property="type" label="姓名" width="200"></el-table-column>
                        <el-table-column property="rmb" label="地址"></el-table-column>
                    </el-table>
                </div>

                <div class="con-page">
                    <el-pagination
                            @size-change="rechargeDialogHandleSizeChange"
                            @current-change="rechargeDialogHandleCurrentChange"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                    </el-pagination>
                </div>

                <div slot="title" class="recharge-title">
                    <h1>用户昵称(1)充值明细</h1>
                    <p>总充值: 8888</p>
                    <i class="el-icon-close" @click="closeRechargeDialog"></i>
                </div>
            </el-dialog>

            <!-- 消费明细 -->
            <el-dialog :visible.sync="consumeDialogFormVisible" :show-close="false">
                <div class="consume">
                    <el-table :data="consumeDetailData.list">
                        <el-table-column property="time" label="消费时间" width="150"></el-table-column>
                        <el-table-column property="project" label="消费项目" width="100"></el-table-column>
                        <el-table-column property="manageName" label="消费主播" width="100"></el-table-column>
                        <el-table-column property="manageId" label="主播编号" width="100"></el-table-column>
                        <el-table-column property="h" label="消费金额(魂币)"></el-table-column>
                    </el-table>
                </div>

                <div class="con-page">
                    <el-pagination
                            @size-change="consumeDialogHandleSizeChange"
                            @current-change="consumeDialogHandleCurrentChange"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                    </el-pagination>
                </div>

                <div slot="title" class="consume-title">
                    <h1>用户昵称 (1) 消费明细</h1>
                    <p>总充值: 8888</p>
                    <i class="el-icon-close" @click="closeConsumeDialog"></i>
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
                searchValue: '', // 搜索
                overageDialogFormVisible: false, // 编辑余额dialog
                rechargeDialogFormVisible: false, // 充值明细dialog
                consumeDialogFormVisible: false, // 消费明细dialog
                rechargeDetailData: {
                    total: 888,
                    list: [
                        {time: '2017-01-01 10:11', type: '支付宝', rmb: 3000},
                        {time: '2017-01-01 10:11', type: '支付宝', rmb: 3000},
                        {time: '2017-01-01 10:11', type: '支付宝', rmb: 3000},
                        {time: '2017-01-01 10:11', type: '支付宝', rmb: 3000},
                    ]
                },
                consumeDetailData: {
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
            rechargeDetail() {
                this.rechargeDialogFormVisible = true
            },
            closeRechargeDialog() {
                this.rechargeDialogFormVisible = false
            },
            consumeDetail() {
                this.consumeDialogFormVisible = true
            },
            closeConsumeDialog() {
                this.consumeDialogFormVisible = false
            },
            rechargeDialogHandleSizeChange() {

            },
            rechargeDialogHandleCurrentChange() {

            },
            consumeDialogHandleSizeChange(){

            },
            consumeDialogHandleCurrentChange(){

            },
            closeEditDialog() {
                this.overageDialogFormVisible = false
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
            background: #ff5d00;
            padding: 3px 10px !important;
        }
        .b-2 {
            background: #00bbff;
            padding: 3px 10px !important;
        }
        .b-3 {
            background: forestgreen;
            padding: 3px 10px !important;
        }
    }

    .dialog {
        .recharge-title {
            text-align: center;
            position: relative;
            background: #00bbff;
            padding: 20px;
            color: #fff;
            font-weight: bold;
            h1 {
                font-size: 20px;
            }
            p {
                font-size: 16px;
            }
        }
        .consume-title {
            text-align: center;
            position: relative;
            background: #29c666;
            padding: 20px;
            color: #fff;
            font-weight: bold;
            h1 {
                font-size: 20px;
            }
            p {
                font-size: 16px;
            }
        }
        .el-icon-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ffb600;
            color: #fff;
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
        }
        .balance-title {
            padding-top: 20px;
            text-align: center;
            font-weight: bold;
            font-size: 20px;
        }
    }
</style>