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
                    <th>操作</th>
                </tr>
                <tr class="border-bottom">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="td-op">
                        <button class="b-1">编辑余额</button>
                        <button class="b-2">充值明细</button>
                        <button class="b-3">消费明细</button>
                    </td>
                </tr>
            </table>
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
        }
        .b-2 {
            background: #00bbff;
        }
        .b-3 {
            background: forestgreen;
        }
    }
</style>