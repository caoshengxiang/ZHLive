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
        <div class="con-table">
            <table>
                <tr>
                    <th>用户编号</th>
                    <th>头像</th>
                    <th>昵称</th>
                    <th>手机</th>
                    <th>举报时间</th>
                    <th>举报类型</th>
                    <th>操作</th>
                </tr>
                <tr class="border-bottom">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="td-op">
                        <button class="b-1">查看</button>
                        <button class="b-2">删除</button>
                    </td>
                </tr>
            </table>
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


    .td-op {
        .b-1 {
            background: #00c7ff;
        }
        .b-2 {
            background: #ff2100;
        }
    }
</style>