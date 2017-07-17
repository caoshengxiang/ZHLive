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

            <div class="living">正在直播: <span class="live-num">50</span></div>
        </div>
        <div class="con">
            <div class="live-box">
                <div class="live-item" v-for="(item, i) in liveData" :key="i">
                    <img class="cover-img" src="../../../assets/placeholder.png" alt="">
                    <!-- 正在直播 -->
                    <p class="living" v-if="$route.params.type == 0">
                        <a>禁用聊天室</a><span> · </span>
                        <a>中断聊天室</a><span> · </span>
                        <a>禁播</a><span> · </span>
                        <a @click="editLiveHandle(item)">编辑</a>
                    </p>
                    <!-- 禁播频道 -->
                    <p class="living" v-if="$route.params.type == 1">
                        <a>解除频道禁播</a>
                    </p>
                    <!-- 聊天室禁用 -->
                    <p class="living" v-if="$route.params.type == 2">
                        <a>解除聊天室禁用</a>
                    </p>
                    <!-- 直播举报 -->
                    <p class="living" v-if="$route.params.type == 3">
                        <span> 用户昵称 </span>
                        <a>查看</a>
                    </p>
                </div>
            </div>
            <div class="con-page" id="page">
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
            <el-dialog :visible.sync="editLiveDialogVisible" :show-close="false">
                <div class="manage-edit">
                    <h3>主播</h3>
                    <input class="text" type="text" :placeholder="manageInfo.name" disabled>
                    <h3>直播标题</h3>
                    <input class="text" type="text" :placeholder="manageInfo.title" v-model="manageInfo.title">
                    <h3>直播封面</h3>
                    <div class="img">
                        <img id="coverImg" src="../../../assets/placeholder.png" alt="">
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
                                v-for="tag in manageInfo.tags"
                                :key="tag.name"
                                :closable="true"
                                :type="tag.type"
                                class="item-tag"
                                @close="delThisTag"
                        >
                            {{tag.name}}
                        </el-tag>
                        <el-tag
                                v-for="tag in tempAddTags"
                                :key="tag.name"
                                :closable="true"
                                :type="tag.type"
                                class="item-tag"
                                @close="delThisTag"
                        >
                            {{tag.name}}
                        </el-tag>
                        <i class="el-icon-plus" @click="addTags">标签</i>
                    </div>
                    <h3>置顶（1－10）</h3>
                    <input class="text" type="text" placeholder="无">
                </div>
                <div slot="title" class="dialog-title">
                    编辑直播信息
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="saveManageInfo">保　存</el-button>
                    <el-button @click="cancelManageInfo">取 消</el-button>
                </div>
            </el-dialog>


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
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'liveManage',
        props: {},
        data() {
            return {
                dropDownMenu: ['正在直播', '禁播频道', '聊天室禁用', '直播举报'],
                dropDownMenuItem: 0,
                searchValue: '',
                liveData: [
                    {
                        name: '主播',
                        title: '表器',
                        icon: '',
                        cate1: '一级分类',
                        cate2: '二级分类',
                        tags: [{id: 1, name: 'qwe'}],
                        top: 0,
                    },
                    {
                        name: '主播1',
                        title: '表器1',
                        icon: '',
                        cate1: '一级分类',
                        cate2: '二级分类',
                        tags: [{id: 1, name: 'qwe'}],
                        top: 0,
                    },
                    {
                        name: '主播2',
                        title: '表器3',
                        icon: '',
                        cate1: '一级分类',
                        cate2: '二级分类',
                        tags: [{id: 1, name: 'qwe'}],
                        top: 0,
                    }
                ],
                currentPage: 1,
                total: 50,
                editLiveDialogVisible: false, // 编辑dialog
                addTagsDialogVisible: false, // 添加标签dialog
                manageInfo: {}, // 主播详细
                childCate: [], // 一级对应的二级分类
                tempAddTags: []
            }
        },
        computed: {
            ...mapState('category', [
                'classifyLists',
                'tags',
            ]),
        },
        methods: {
            ...mapActions('category', [
                'ac_classify_list',
                'ac_tags_list'
            ]),
            handleCommand(va) { // 下拉
                this.dropDownMenuItem = parseInt(va, 10);

                this.$router.push({name: 'liveManage', params: {type: va, page: 1}})
                // pull数据
            },
            hotWordsPage() { // 热词设置
                this.$router.push({name: 'hotWords'})
            },
            gitManagePage() { // 礼物管理
                this.$router.push({name: 'giftManage', params: {page: 1}})
            },
            handleSearchClick() {

            },
            handleCurrentChange(val) {
                this.$router.push({name: 'liveManage', params: {type: this.$route.params.type, page: val}})
            },
            editLiveHandle(item) { // 点击编辑
                this.editLiveDialogVisible = true
                this.manageInfo = item
                this.$nextTick(() => {
                    this.classifyLists.forEach((ca, i) => {
                        if (ca.name === item.cate1) {
                            document.getElementById('category-1').selectedIndex = i
                            this.childCate = ca.child
                        }
                    })
                    this.$nextTick(() => {
                        this.childCate.forEach((ca2, j) => {
                            if (ca2.name === item.cate2) {
                                document.getElementById('category-2').selectedIndex = j
                            }
                        })
                    })
                })

            },
            changeCate1Handle(e) { // 点击一级分类
//                console.log(e.target.value)

                let cate2 = this.classifyLists.filter((item) => {
                    if (e.target.value === item.name) {
                        return item
                    }
                })

                this.childCate = cate2[0].child // 设置对应的二级分类
                this.manageInfo.cate1 = e.target.value // 修改一级
                this.manageInfo.cate2 = this.childCate[0].name // 默认二级
            },
            changeCage2Handle(e) {
                this.manageInfo.cate2 = e.target.value
            },
            fileUpload(e) {
                let f = e.target.files[0];
                let r = new FileReader();
                let that = this;
                let imgDom = document.getElementById('coverImg');

                r.readAsDataURL(f)
                r.onload = function () {
                    imgDom.src = r.result
                    that.manageInfo.icon = r.result
                }
            },
            addTags() {
                this.editLiveDialogVisible = false
                this.addTagsDialogVisible = true
                this.$nextTick(() => {

                    this.initClass()

                    this.tags.forEach((item, i) => {
                        this.manageInfo.tags.forEach((info) => {
                            if (item.name === info.name) {
                                document.getElementsByClassName('tag-item')[i].className = 'item tag-item active'
                            }
                        })
                    })

                })
            },
            delThisTag(tag) {
                this.manageInfo.tags.splice(this.manageInfo.tags.indexOf(tag), 1)
            },
            saveManageInfo() { // 保存
                console.log('保存', this.manageInfo)
                this.manageInfo.tags = [...this.manageInfo.tags, ...this.tempAddTags]
                this.tempAddTags = []
            },
            cancelManageInfo() { // 取消
                this.tempAddTags = []
                this.editLiveDialogVisible = false
            },
            addThisTag(tag, i) {
                let isExist = false

                this.manageInfo.tags.forEach((info) => {
                    if (tag.name === info.name) {
                        isExist = true
                    }
                })
                if (!isExist) {
                    document.getElementsByClassName('tag-item')[i].className = 'item tag-item active'
                    this.tempAddTags.push(tag)
                }
            },
            addTagsSave() {
                this.addTagsDialogVisible = false
                this.editLiveDialogVisible = true
            },
            addTagsCancel() {
                this.addTagsDialogVisible = false
                this.editLiveDialogVisible = true

            },
            initClass() {
                let allEl = document.getElementsByClassName('tag-item')

                for (let i = 0; i < allEl.length; i++) {
                    allEl[i].className = 'item tag-item'
                }
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.ac_classify_list()
            this.ac_tags_list()
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
            .cover-img {
                width: 217.5px;
                height: 217.5px;
            }
        }
    }

    .manage-edit {
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
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
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

    .dialog-title {
        background: #ff5000;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
    }

    .el-dialog__header {
        padding: 0 !important;
    }
</style>