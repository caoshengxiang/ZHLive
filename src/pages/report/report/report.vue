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
                    <th width="70px">用户编号</th>
                    <th width="50px">头像</th>
                    <th width="110px">昵称</th>
                    <th width="110px">手机</th>
                    <th width="130px">举报时间</th>
                    <th width="180px">举报类型</th>
                    <th width="170px">操作</th>
                </tr>
                <tr class="border-bottom" v-for="item in reportList" :key="item.id">
                    <td>{{item.userId}}</td>
                    <td><img class="user-icon" :src="item.userIcon" alt=""></td>
                    <td>{{item.userNickname}}</td>
                    <td>{{item.userPhone}}</td>
                    <td>{{item.createTime}}</td>
                    <td>
                        <span v-if="item.type ==='ADVERTISINGFRAUD'">广告欺诈</span>
                        <span v-if="item.type ==='OBSCENEPORNOGRAPHY'">淫秽色情</span>
                        <span v-if="item.type ==='HARASSMENT'">骚扰谩骂</span>
                        <span v-if="item.type ==='REACTIONARYPOLITICS'">反动政治</span>
                        <span v-if="item.type ==='OTHER'">其他</span>
                    </td>
                    <td class="td-op">
                        <button class="b-1" @click="showDetail(item)">查看</button>
                        <button class="b-2" @click="delReport(item)">删除</button>
                    </td>
                </tr>
            </table>

            <div class="con-page">
                <el-pagination
                        v-if="reportTotal > 5"
                        layout="prev, pager, next, jumper"
                        :total="reportTotal"
                        :page-size="2"
                        @current-change="handleCurrentPageChange"
                        :current-page="currentPage"
                >
                </el-pagination>
            </div>
        </div>

        <div class="dialog">
            <!-- 查看 -->
            <el-dialog title="用户举报" :visible.sync="detailDialogFormVisible">
                <div class="detail">　
                    <p><label>举报用户: </label><span>{{reportDetail.userNickname}}（{{reportDetail.userId}}）</span></p>
                    <p><label>举报事项: </label>
                        <span v-if="reportDetail.exposeFor === 'USER'">用户</span>
                        <span v-if="reportDetail.exposeFor === 'LIVE'">直播</span>
                        <span v-if="reportDetail.exposeFor === 'RECORDVIDEO'">录像 ({{reportDetail.videoTitle}})</span>
                    </p>
                    <p><label>被举报人: </label><span>{{reportDetail.defendantNickname}}（{{reportDetail.defendantId}}）</span></p>
                    <p><label>举报内容: </label>
                        <span v-if="reportDetail.type ==='ADVERTISINGFRAUD'">广告欺诈</span>
                        <span v-if="reportDetail.type ==='OBSCENEPORNOGRAPHY'">淫秽色情</span>
                        <span v-if="reportDetail.type ==='HARASSMENT'">骚扰谩骂</span>
                        <span v-if="reportDetail.type ==='REACTIONARYPOLITICS'">反动政治</span>
                        <span v-if="reportDetail.type ==='OTHER'">其他</span>
                    </p>
                </div>
                <div class="op">
                    <el-button type="danger" @click="delReport(reportDetail)">删除</el-button>
                    <el-button @click="backList">返回</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'report',
        props: {},
        data() {
            return {
                searchValue: '',
                detailDialogFormVisible: false,
                reportDetail: {}
            }
        },
        computed: {
            ...mapState('report', [
                'reportList',
                'reportTotal',
                'successBack'
            ]),
            currentPage() {
                return parseInt(this.$route.params.page, 10)
            }
        },
        watch: {
            successBack(me) {
                if (me) {
                    this.ac_report_list({pageIndex: this.$route.params.page, pageSize: 2})
                }
            }
        },
        methods: {
            ...mapActions('report', [
                'ac_report_list',
                'ac_report_remove'
            ]),
            userReportPage() {
//                this.$router.push({name: 'reportManage', params: {page: 1}})
            },
            userFeedbackPage() {
                this.$router.push({name: 'feedback', params: {page: 1}})
            },
            handleSearchClick() {
                this.ac_report_list({pageIndex: 1, pageSize: 2, search: this.searchValue})
            },
            showDetail(item) {
                this.detailDialogFormVisible = true
                this.reportDetail = item
            },
            delReport(item) {
                this.$confirm('确认删除举报信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ac_report_remove({id: item.id})
//                    this.$message({
//                        type: 'success',
//                        message: '删除成功!'
//                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            backList() {
                this.detailDialogFormVisible = false
            },
            handleCurrentPageChange(p) { // 分页
                this.$router.push({name: 'reportManage', params: {page: p}})
                this.ac_report_list({pageIndex: p, pageSize: 2})
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.ac_report_list({pageIndex: 1, pageSize: 2})
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

    .user-icon {
        width: 30px;
        height: 30px;
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