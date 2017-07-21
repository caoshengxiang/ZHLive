<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item" @click="userReportPage">用户举报</div>
                <div class="con-col-item  con-col-active" @click="userFeedbackPage">用户反馈</div>
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
                    <th>反馈时间</th>
                    <th width="178px">联系方式(手机号/QQ/微信)</th>
                    <th width="170px">操作</th>
                </tr>
                <tr class="border-bottom" v-for="item in feedbackList" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.userIcon}}</td>
                    <td>{{item.userNickname}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.contact}}</td>
                    <td class="td-op">
                        <button class="b-1" @click="showDetail(item)">查看</button>
                        <button class="b-2" @click="delFeedbackInfo(item)">删除</button>
                    </td>
                </tr>
            </table>

            <div class="con-page">
                <el-pagination
                        v-if="feedbackTotal > 10"
                        layout="prev, pager, next, jumper"
                        :total="feedbackTotal"
                        @current-change="handleCurrentPageChange"
                        :current-page="currentPage"
                >
                </el-pagination>
            </div>
        </div>

        <div class="dialog">
            <!-- 查看 -->
            <el-dialog title="用户举报" :visible.sync="detailDialogFormVisible" >
                <div class="detail">　
                    <p><label>举报用户: </label><span>用户昵称（123）</span></p>
                    <p><label>举报事项: </label><span>录像</span></p>
                    <p><label>被举报人: </label><span>用户昵称（10）</span></p>
                    <p><label>举报内容: </label><span>支付宝（123）</span></p>
                </div>
                <div class="op">
                    <el-button type="danger">删除</el-button>
                    <el-button @click="backList">返回</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'feedback',
        props: {},
        data() {
            return {
                searchValue: '',
                detailDialogFormVisible: false
            }
        },
        computed: {
            ...mapState('report', [
                'feedbackList',
                'feedbackTotal'
            ]),
            currentPage() {
                return this.$route.params.page
            }
        },
        methods: {
            ...mapActions('report', [
                'ac_feedback_list',
                'ac_report_remove'
            ]),
            userReportPage() {
                this.$router.push({name: 'reportManage', params: {page: 1}})
            },
            userFeedbackPage() {
//                this.$router.push({name: 'feedback'})
            },
            handleSearchClick() {
                this.ac_feedback_list({pageIndex:this.$route.params.page, pageSize:10, search: this.searchValue})
            },
            showDetail(item) { // 显示反馈详细
                this.detailDialogFormVisible = true
            },
            delFeedbackInfo(item){ // 删除反馈信息
                this.ac_report_remove({id: item.id})
            },
            backList() {
                this.detailDialogFormVisible = false
            },
            handleCurrentPageChange(p) {
                this.$router.push({name: 'feedback', params: {page: p}})
                this.ac_feedback_list({pageIndex: p, pageSize: 10})
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.ac_feedback_list({pageIndex: 1, pageSize: 10})
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
    }
    .el-button {
        width: 30%;
    }
</style>