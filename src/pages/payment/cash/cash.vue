<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item" @click="userWealthPage">用户财富管理</div>
                <div class="con-col-item" @click="anchorIncomePage">主播收入明细</div>
                <div class="con-col-item con-col-active" @click="userCashPage">帐号提现申请</div>
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
                    <th width="150px">操作</th>
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
                        <button class="b-1" @click="showApply">查看提现申请</button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="dialog">
            <!-- 提现申请 -->
            <el-dialog title="提现申请" :visible.sync="applyDialogFormVisible" :show-close="false">
                <div class="detail">　
                    <p><label>申请用户: </label><span>用户昵称（123）</span></p>
                    <p><label>申请时间: </label><span>2017-01-12 18:00</span></p>
                    <p><label>提现金额: </label><span>2000魂豆（RMB 10）</span></p>
                    <p><label>提现地址: </label><span>支付宝（123）</span></p>
                </div>
                <div class="op">
                    <el-button type="success">同意提现</el-button>
                    <el-button type="danger">拒绝</el-button>
                    <el-button @click="backList">返回</el-button>
                </div>
                <div slot="title" class="cash-title">
                    提现申请
                    <i class="el-icon-close" @click="closeDialog"></i>
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
                applyDialogFormVisible: false,
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
            showApply() {
                this.applyDialogFormVisible = true
            },
            backList() {
                this.applyDialogFormVisible = false
            },
            closeDialog() {
                this.applyDialogFormVisible = false
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
            background: #00aeff;
        }
    }

    .dialog {
        .detail {
            p {
                margin-bottom: 14px;
                label {
                    font-weight: bold;
                }
            }
        }
        .op {
            width: 100%;
            margin-top: 30px;
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
        .cash-title {
            padding-top: 20px;
            text-align: center;
            font-weight: bold;
            font-size: 20px;
        }
    }
    .el-button {
        width: 20%;
    }
</style>