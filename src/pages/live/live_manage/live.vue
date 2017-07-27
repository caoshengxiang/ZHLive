<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <el-dropdown
                        trigger="click"
                        @command="handleCommand"
                        class="drop-down-active">
                    <el-button type="primary">
                        {{dropDownMenu[dropDownMenuItem]}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                                v-for="(item, i) in dropDownMenu"
                                :key="i"
                                :command="i.toString()">{{item}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <div class="con-col-item" @click="hotWordsPage">搜索热词设置</div>
                <div class="con-col-item" @click="gitManagePage">礼物管理</div>
            </div>

            <div class="search">
                <el-input
                        placeholder="用户昵称"
                        icon="search"
                        v-model="searchValue"
                        :on-icon-click="handleSearchClick">
                </el-input>
            </div>

            <div class="living" v-if="$route.params.type === '0'">正在直播: <span class="live-num">{{liveTotal}}</span></div>
            <div class="living" v-if="$route.params.type === '1'">禁播频道: <span class="live-num">{{liveTotal}}</span></div>
            <div class="living" v-if="$route.params.type === '2'">聊天室禁用: <span class="live-num">{{liveTotal}}</span></div>
            <div class="living" v-if="$route.params.type === '3'">直播举报: <span class="live-num">{{liveTotal}}</span></div>
        </div>
        <div class="con">
            <div class="live-box">
                <div class="live-item" v-for="(item, i) in liveList" :key="i">
                    <div class="img-box">
                    <img class="cover-img" :src="item.videoPic" alt="">
                    </div>
                    <!-- 正在直播 -->
                    <p class="living" v-if="$route.params.type == 0">
                        <a class="number">{{item.userId}}</a>
                        <a @click="disableChatRoom(item)">禁用聊天室</a><span> · </span>
                        <a @click="disableLive(item)">中断直播</a><span> · </span>
                        <a @click="disablePlay(item)">禁播</a><span> · </span>
                        <a @click="editLiveHandle(item)" class="edit">编辑</a>
                    </p>
                    <!-- 禁播频道 -->
                    <p class="living disabled" v-if="$route.params.type == 1">
                        <a @click="liveEnable(item)">解除频道禁播</a>
                    </p>
                    <!-- 聊天室禁用 -->
                    <p class="living disabled" v-if="$route.params.type == 2">
                        <a @click="chatroomEnable(item)">解除聊天室禁用</a>
                    </p>
                    <!-- 直播举报 -->
                    <p class="living report" v-if="$route.params.type == 3">
                        <span> 用户昵称 </span>
                        <a class="look" @click="lookReport(item)">查看</a>
                    </p>
                </div>
            </div>
            <div class="con-page" id="page">
                <el-pagination
                        v-if="liveTotal > 10"
                        layout="prev, pager, next, jumper"
                        :total="liveTotal"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                >
                </el-pagination>
            </div>
        </div>

<!-- 弹窗 -->
        <div class="dialog">
            <!--编辑-->
            <el-dialog :visible.sync="editLiveDialogVisible" :show-close="false">
                <div class="live-edit">
                    <h3>主播</h3>
                    <input class="text" type="text" :placeholder="liveDetail.anchor" disabled>
                    <h3>直播标题</h3>
                    <input class="text" type="text" :placeholder="liveDetail.title" v-model="liveDetail.title">
                    <h3>直播封面</h3>
                    <div class="img">
                        <img id="coverImg" :src="liveDetail.videoPic" alt="">
                        <div class="upload">
                            <el-button icon="upload2">上传</el-button>
                            <input type="file" class="file" @change="fileUpload">
                        </div>
                    </div>
                    <h3>分类</h3>
                    <div class="cla">
                        <select id="category-1" class="sel" @change="changeCate1Handle">
                            <option
                                    v-for="cate in classifyLists"
                                    :key="cate.id"
                                    :value="cate.name">{{cate.name}}
                            </option>
                        </select>
                        <span class="cate2">-- <select id="category-2" class="sel" @change="changeCage2Handle">
                            <option v-for="cate2 in childCate" :value="cate2.name">{{cate2.name}}</option>
                        </select></span>
                    </div>
                    <h3>标签</h3>
                    <div class="tags-con">
                        <el-tag
                                v-for="(tag, index) in liveDetail.labelNames"
                                :key="index"
                                :closable="true"
                                class="item-tag"
                                @close="delThisTag(tag)"
                        >
                            {{tag}}
                        </el-tag>
                        <el-tag
                                v-for="tag in tempAddTags"
                                :key="tag.id"
                                :closable="true"
                                class="item-tag"
                                @close="delThisAddTag(tag)"
                        >
                            {{tag.name}}
                        </el-tag>
                        <i class="el-icon-plus" @click="addTags">标签</i>
                    </div>
                    <h3>置顶（1－10）</h3>
                    <input class="text" type="text" v-model="liveDetail.hot" placeholder="无">
                </div>
                <div slot="title" class="dialog-title">
                    编辑直播信息
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="saveManageInfo">保　存</el-button>
                    <el-button @click="cancelManageInfo">取 消</el-button>
                </div>
            </el-dialog>

<!--标签-->
            <el-dialog :visible.sync="addTagsDialogVisible" :show-close="false">
                <div class="add-tags">
                    <div v-for="(tag, i) in tags" class="item tag-item" @click="addThisTag(tag, i)">
                        <span>{{tag.name}}</span>
                        <i class="el-icon-check"></i>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="addTagsSave">保　存</el-button>
                    <el-button @click="addTagsCancel">取 消</el-button>
                </div>
            </el-dialog>

            <!--举报-->
            <el-dialog :visible.sync="lookReportDialogVisible" :show-close="false">
                <div class="look">
                    <el-table :data="liveReportList">
                        <el-table-column property="createTime" label="举报时间" width="150"></el-table-column>
                        <el-table-column property="userNickname" label="举报用户" width="200"></el-table-column>
                        <el-table-column property="content" label="举报内容"></el-table-column>
                    </el-table>
                    <div class="con-page" v-if="liveReportListTotal > 10">
                        <el-pagination
                                @current-change="lookDialogHandleCurrentChange"
                                :page-size="10"
                                layout="prev, pager, next, jumper"
                                :total="liveReportListTotal">
                        </el-pagination>
                    </div>
                    <div class="op">
                        <a @click="disableChatRoom({videoId: videoId})">禁用聊天室</a>
                        <a @click="disableLive({videoId: videoId})">中断直播</a>
                        <a @click="disablePlay({videoId: videoId})">禁播</a>
                    </div>
                </div>
                <div slot="title" class="report-title">
                    <h3>直播举报</h3>
                    <p>主播: <span>{{liveReportDetail.anchor}}</span></p>
                    <p>直播主题: <span>{{liveReportDetail.title}}</span></p>
                    <i class="el-icon-close" @click="closeLookDialog"></i>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        name: 'liveManage',
        props: {},
        data() {
            return {
                dropDownMenu: ['正在直播', '禁播频道', '聊天室禁用', '直播举报'],
                dropDownMenuItem: 0,
                searchValue: '',

                editLiveDialogVisible: false, // 编辑dialog
                addTagsDialogVisible: false, // 添加标签dialog
                lookReportDialogVisible: false, // 直播举报查看dialog
                childCate: [], // 一级对应的二级分类
                tempAddTags: [],
                liveType: ['LIVING', 'DISUSER', 'DISCHATROOM', 'EXPOSELIVE'],
                videoId: '', // 直播举报videoid
            }
        },
        computed: {
            ...mapState('category', [
                'classifyLists',
                'tags',
            ]),
            ...mapState('live', [
                'liveList',
                'liveTotal',
                'liveSuccessBack',
                'liveDetail',
                'liveReportList',
                'liveReportListTotal',
                'liveReportDetail',
            ]),
            ...mapGetters('live', [
                'getter_liveReportList'
            ]),
            currentPage() {
                return parseInt(this.$route.params.page, 10)
            }
        },
        watch: {
            liveSuccessBack(me){
                if (me) {
                    this.ac_live_list({
                        type: this.liveType[this.$route.params.type],
                        pageIndex: this.$route.params.page,
                        pageSize: 10})
                    this.editLiveDialogVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.lookReportDialogVisible = false
                }
            },
            liveDetail() {
                this.$nextTick(() => {
//                    document.getElementById('category-2').selectedIndex = -1
//                    document.getElementById('category-1').selectedIndex = -1
                    this.classifyLists.forEach((ca, i) => {
                        if (ca.name === this.liveDetail.levelOneCategoryName) {
                            document.getElementById('category-1').selectedIndex = i
                            this.childCate = ca.child
                        }
                    })
                    this.$nextTick(() => {
                        this.childCate.forEach((ca2, j) => {
                            if (ca2.name === this.liveDetail.levelTwoCategoryName) {
                                document.getElementById('category-2').selectedIndex = j
                            }
                        })
                    })
                })
            }
        },
        methods: {
            ...mapActions('category', [
                'ac_classify_list',
                'ac_tags_list',
            ]),
            ...mapActions('live', [
                'ac_live_list',
                'ac_disable_chartroom',
                'ac_disable_live',
                'ac_disable_play',
                'ac_live_edit',
                'ac_live_detail',
                'ac_live_play_enable',
                'ac_chatroom_enable',
                'ac_live_report_list',
                'ac_live_report_detail'
            ]),
            handleCommand(va) { // 下拉
                this.dropDownMenuItem = parseInt(va, 10);

                this.$router.push({name: 'liveManage', params: {type: va, page: 1}})
                this.ac_live_list({
                    type: this.liveType[this.$route.params.type],
                    pageIndex: this.$route.params.page,
                    pageSize: 10})
            },
            hotWordsPage() { // 热词设置
                this.$router.push({name: 'hotWords'})
            },
            gitManagePage() { // 礼物管理
                this.$router.push({name: 'giftManage', params: {page: 1}})
            },
            handleSearchClick() {
                this.ac_live_list({
                    type: this.liveType[this.$route.params.type],
                    search: this.searchValue,
                    pageIndex: this.$route.params.page,
                    pageSize: 10})
            },
            handleCurrentChange(val) { // 直播分页
                this.$router.push({name: 'liveManage', params: {type: this.$route.params.type, page: val}})
                this.ac_live_list({
                    type: this.liveType[this.$route.params.type],
                    pageIndex: this.$route.params.page,
                    pageSize: 10})
            },
            editLiveHandle(item) { // 点击编辑
                this.editLiveDialogVisible = true
                this.ac_live_detail(item)

            },
            disableChatRoom(item) { // 禁用聊天室
                this.$confirm('确认禁用聊天室, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ac_disable_chartroom(item)
                    /*this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });*/
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            disableLive(item) { // 中断直播
                this.$confirm('确认中断直播, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ac_disable_live(item)
                    /*this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });*/
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除!'
                    });
                });
            },
            disablePlay(item) { // 禁播
                this.$confirm('确认禁播, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ac_disable_play(item)
                    /*this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });*/
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            liveEnable(item) { // 解除禁播
                this.ac_live_play_enable(item)
            },
            chatroomEnable(item) { // 解除聊天室禁用
                this.ac_chatroom_enable(item)
            },
            changeCate1Handle(e) { // 点击一级分类
//                console.log(e.target.value)

                let cate2 = this.classifyLists.filter((item) => {
                    if (e.target.value === item.name) {
                        return item
                    }
                })

                this.childCate = cate2[0].child // 设置对应的二级分类
                this.liveDetail.levelOneCategoryName = e.target.value // 修改一级
                this.liveDetail.levelTwoCategoryName = this.childCate[0].name // 默认二级
            },
            changeCage2Handle(e) {
                this.liveDetail.levelTwoCategoryName = e.target.value
            },
            fileUpload(e) {
                let f = e.target.files[0];
                let r = new FileReader();
                let that = this;
                let imgDom = document.getElementById('coverImg');

                r.readAsDataURL(f)
                r.onload = function () {
                    imgDom.src = r.result
                    that.liveDetail.videoPic = r.result
//                    console.log(r.result)
                }
            },
            addTags() { // 添加标签图标按钮
                this.editLiveDialogVisible = false
                this.addTagsDialogVisible = true
                this.$nextTick(() => {

                    this.initClass()

                    if (this.liveDetail.labelNames && this.liveDetail.labelNames.length) {
                        this.tags.forEach((item, i) => {
                            this.liveDetail.labelNames.forEach((tagName) => {
                                if (item.name === tagName) {
                                    document.getElementsByClassName('tag-item')[i].className = 'item tag-item active'
                                }
                            })
                        })
                    }

                })
            },
            delThisTag(tag) { // 删除已有标签
                this.liveDetail.labelNames.splice(this.liveDetail.labelNames.indexOf(tag), 1)
                this.tags.forEach(item=>{
                    console.info(item, tag)
                    if (item.name === tag) {
                        if (!this.liveDetail.removeLabelIds) {
                            this.liveDetail.removeLabelIds = []
                        }
                        this.liveDetail.removeLabelIds.push(item.id)
                    }
                })
            },
            delThisAddTag(tag) { // 删除添加的标签
                this.tempAddTags.forEach((item,index)=>{
                    if (item.name === tag.name) {
                        this.tempAddTags.splice(index, 1)
                    }
                })
            },
            saveManageInfo() { // 保存编辑
                console.log('保存', this.liveDetail)
                if (!this.liveDetail.labelNames) {
                    this.liveDetail.labelNames = []
                }
//                this.liveDetail.labelNames = [...this.liveDetail.labelNames, ...this.tempAddTags]

                if (!this.liveDetail.addLabelIds) {
                    this.liveDetail.addLabelIds = []
                }
                if (this.tempAddTags) {
                    this.tempAddTags.forEach(tag=>{
                        this.liveDetail.addLabelIds.push(tag.id)
                    })
                }
                this.tempAddTags = []

                this.ac_live_edit(this.liveDetail)
            },
            cancelManageInfo() { // 取消编辑
                this.tempAddTags = []
                this.editLiveDialogVisible = false
                this.ac_live_list({
                    type: this.liveType[this.$route.params.type],
                    pageIndex: this.$route.params.page,
                    pageSize: 10})
            },
            addThisTag(tag, i) {
                let isExist = false

                if (this.liveDetail.labelNames && this.liveDetail.labelNames.length) {
                    this.liveDetail.labelNames.forEach((info) => {
                        if (tag.name === info) {
                            isExist = true
                        }
                    })
                }

                if (!isExist) {
                    document.getElementsByClassName('tag-item')[i].className = 'item tag-item active'
                    this.tempAddTags.push(tag)
                }
            },
            addTagsSave() { // 添加标签保存
                this.addTagsDialogVisible = false
                this.editLiveDialogVisible = true
            },
            addTagsCancel() { // 添加标签取消
                this.addTagsDialogVisible = false
                this.editLiveDialogVisible = true
                this.tempAddTags = []
            },
            initClass() {
                let allEl = document.getElementsByClassName('tag-item')

                for (let i = 0; i < allEl.length; i++) {
                    allEl[i].className = 'item tag-item'
                }
            },
            lookReport(item) { // 查看直播举报
                this.lookReportDialogVisible = true
                this.ac_live_report_list({
                    videoId: item.videoId,
                    pageIndex: 1,
                    pageSize: 10
                })
                this.ac_live_report_detail(item)
                this.videoId = item.videoId
            },
//            lookDialogHandleSizeChange(val) { // 举报dialog分页
//                this.ac_live_list({
//                    type: this.liveType[this.$route.params.type],
//                    pageIndex: val,
//                    pageSize: 10})
//            },
            lookDialogHandleCurrentChange(val) { // 举报dialog分页
                this.ac_live_report_list({
                    videoId: this.videoId,
                    pageIndex: val,
                    pageSize: 10
                })
            },
            closeLookDialog() {
                this.lookReportDialogVisible = false
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.ac_classify_list()
            this.ac_tags_list()
            this.ac_live_list({
                type: this.liveType[this.$route.params.type],
                pageIndex: this.$route.params.page,
                pageSize: 10})

            this.dropDownMenuItem = parseInt(this.$route.params.type, 10)
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

    .con-top {

        .living {
            color: #fff;
            display: flex;
            align-items: center;
            margin-right: 20px;
            .live-num {
                color: #ff6100;
                font-weight: bold;
                font-size: 30px;
            }

        }
    }

    .con {
        .live-box {
            display: flex;
            flex-wrap: wrap;
        }
        .live-item {
            font-size: 12px;
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            .img-box {
                width: 227.5px;
                height: 227.5px;
                overflow: hidden;
                .cover-img {
                    width: 100%;
                }
            }
            .living {
                padding: 0px 5px 4px 5px;
                a {
                    cursor: pointer;
                }
                .edit {
                    font-weight: bold;
                }
                &.disabled {
                    text-align: right;
                    a {
                        color: #ff3f00;
                    }
                }
                &.report {
                    display: flex;
                    justify-content: space-between;
                    padding-left: 14px;
                    padding-right: 14px;
                    .look {
                        font-weight: bold;
                    }
                }
                .number {
                    background: #ffb600;
                    padding: 1px 5px;
                    border-radius: 50%;
                    display: inline-block;
                    color: #fff;
                    font-weight: bold;
                    font-size: 14px;
                }
            }
        }
    }

    .live-edit {
        h3 {
            margin-bottom: 10px;
        }
        .text {
            width: 80%;
            border-radius: 5px;
            padding: 3px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
        }
        .img {

            img {
                width: 90px;
                height: 75px;
            }
            .upload {
                position: relative;
                display: inline-block;
                top: -10px;
            }
            .file {
                width: 80px;
                height: 36px;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
        }
        .cla {
            display: inline-block;
            width: 100%;
            margin-bottom: 10px;
            .sel {
                min-width: 120px;
            }
            .cate2 {

            }
        }
        .tags-con {
            width: 80%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
            box-sizing: border-box;
            .item-tag {
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .el-icon-plus {
                background: #ffb600;
                color: #fff;
                padding: 5px;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }

    .add-tags {
        min-height: 200px;
        border: 1px solid #ccc;
        padding: 10px 20px;

        .item {
            background: #c1bbbb;
            display: inline-block;
            font-size: 12px;
            border-radius: 5px;
            position: relative;
            text-align: center;
            padding: 3px 5px;
            width: 85px;
            height: 24px;
            box-sizing: border-box;
            margin-right: 10px;
            overflow: hidden;
            span {
                /*padding: 0 5px;*/
                /*display: inline-block;*/
            }
            i {
                background: #ff9900;
                color: #fff;
                height: 100%;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                position: absolute;
                right: 0;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 4px;
                box-sizing: border-box;
                visibility: hidden;
            }

            &.active {
                /*padding-right: 26px;*/
                text-align: left;
                border: 2px solid #ff9900;
                i {
                    visibility: visible;
                }
            }
        }
    }
    .dialog {
        .look {
            .op {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                a {
                    width: 33.3%;
                    color: #ff8300;
                    cursor: pointer;
                    text-align: center;
                    border: 1px solid #ccc;
                    padding: 10px 0;
                }
            }

        }
        .report-title {
            background-color: #ff5d00;
            color: #fff;
            position: relative;
            padding: 10px 0;
            p {
                margin-top: 10px;
            }
            i {
                padding: 5px;
                color: #ff5d00;
                background: #fff;
                border-radius: 50%;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }

    .dialog-title {
        background: #ff5000;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        padding: 10px;
        border-radius: 0px;
    }

    .el-dialog__header {
        padding: 0 !important;
    }
</style>