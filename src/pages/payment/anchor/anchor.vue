<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item" @click="userWealthPage">用户财富管理</div>
                <div class="con-col-item  con-col-active" @click="anchorIncomePage">主播收入明细</div>
                <div class="con-col-item" @click="userCashPage">账户提现申请</div>
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
</style>