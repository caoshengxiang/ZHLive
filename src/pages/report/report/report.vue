<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item con-col-active" @click="userReportPage">用户举报</div>
                <div class="con-col-item" @click="userFeedbackPage">用户反馈</div>
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
        name: 'report',
        props: {},
        data() {
            return {
                searchValue: ''
            }
        },
        computed: {},
        methods: {
            userReportPage() {
                this.$router.push({name: 'reportManage'})
            },
            userFeedbackPage() {
                this.$router.push({name: 'feedback'})
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