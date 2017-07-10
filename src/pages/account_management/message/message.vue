<template>
    <div>
        <div class="top">
            <div class="drop-down">
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

                <div class="message">系统消息</div>
            </div>
            <div class="add-msg" @click="sendMessage">+ 发布新消息</div>

        </div>
        <div class="con">
            <table width="100%" style="table-layout: fixed">
                <tr>
                    <th>发布时间</th>
                    <th class="th-msg">消息内容</th>
                    <th>操作</th>
                </tr>
                <tr class="d" v-for="(item, index) in tableData" :key="index">
                    <td>{{ item.time }}</td>
                    <td style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;text-align: left">{{ item.msg
                        }}
                    </td>
                    <td class="op">
                        <button class="item0" @click="showMessage(item)">查看</button>
                    </td>
                </tr>
            </table>
            <div class="page">
                <el-pagination
                        layout="prev, pager, next, jumper"
                        :total="total"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                >
                </el-pagination>
            </div>
        </div>

        <!-- 弹窗 -->
        <div class="dialog">
            <!-- 查看消息 -->
            <el-dialog :title="messageDetail.time" :visible.sync="dialogVisible1">
                <div class="detail-msg">
                    {{messageDetail.msg}}
                </div>
            </el-dialog>

            <!--　发布新消息　-->
            <el-dialog title="发布系统消息" :visible.sync="dialogVisible2">
                <textarea style="padding-left: 3px" name="" id="edit" cols="80" rows="26" placeholder="输入消息"></textarea>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="">发　布</el-button>
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'Message',
        props: {},
        data() {
            return {
                dropDownMenu: ['全部用户', '禁用用户', '全部主播', '主播申请列表'],
                dropDownMenuItem: 0,
                searchValue: '',
                tableData: [
                    {
                        time: '2017-02-01 11:50',
                        msg: '消息消息消息消息,消息消息消息消息消息消息消息消息,消息消息消息消息,消息消息消息消息消息消息消息消息消息消息消息消息,消息消息.息消息消息消息消息,消息消息'
                    },
                    {time: '2017-02-01 11:50', msg: '消息消息消息消息,消息消息消息消息消息消息消息消息'},
                    {time: '2017-02-01 11:50', msg: '消息消息消息消息,消息消息消息消息消息消息消息消息'},
                ],
                total: 50,
                dialogVisible1: false,
                dialogVisible2: false,
                messageDetail: {time: '2017-02-01 11:50', msg: '消息消息消息消息,消息消息消息消息消息消息消息消息'},

            }
        },
        watch: {},
        computed: {
            currentPage() {
                return parseInt(this.$route.params.page, 10)
            }
        },
        methods: {
            handleCommand(va) {
                this.dropDownMenuItem = parseInt(va, 10);
                this.$router.push({name: 'accountManagement', params: {type: va, page: 1}})
            },
            handleCurrentChange(item) { // 分页
                this.$router.push({name: 'message', params: {page: item}})
            },
            showMessage(item) {
                this.dialogVisible1 = true
            },
            sendMessage() {
                this.dialogVisible2 = true
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
    @import "../../../styles/mixin";

    .top {
        @include top-box;
        position: relative;
        .drop-down {
            margin-left: 20px;
            height: 100%;
            width: 50%;
            display: flex;
            align-items: center;
            .message {
                display: inline-block;
                background: #605d5d;
                padding: 7px 40px;
                margin-left: 10px;
                border-radius: 5px;
                color: #e2dcdc;
                cursor: pointer;
            }
        }
        .add-msg {
            display: inline-block;
            background: #ff5d00;
            padding: 5px 30px;
            float: right;
            border-radius: 5px;
            position: absolute;
            top: 10px;
            right: 30px;
            cursor: pointer;
        }
        .el-button--primary {
            background: #9b9090;
            border-color: #9b9090;
        }
        .el-button {
            padding: 10px 20px;
            width: 150px;
        }
    }

    .con {
        table {
            padding: 20px;
            width: 100%;
            tr {
                th {
                    @include table-tr;
                    text-align: center;
                    font-size: 14px;
                    &.th-msg {

                    }
                }
                td {
                    @include table-tr;
                    text-align: center;
                    overflow: hidden;
                    font-size: 14px;
                    &.td-2 {

                    }
                }
                .op {
                    button {
                        margin: 0 3px;
                        font-size: 14px;
                        @include table-button;
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
                            background: red;
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
            .d {
                border-bottom: 1px solid #ccc;
            }
        }
        .page {
            text-align: center;
            margin-top: 30px;
        }

        .dialog {
            .detail-msg {
                min-height: 400px;
                border: 1px solid #ccc;
                padding: 5px;
            }

            #edit {
                resize: none;
            }
            .el-button--primary {
                background-color: #ff5400;
                border-color: #ff5400;
                padding-left: 20px;
                padding-right: 20px;
            }
        }
    }
</style>