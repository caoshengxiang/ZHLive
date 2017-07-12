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
        </div>
        <div class="con">
            <div class="live-box">
            <div class="live-item" v-for="(item, i) in liveData" :key="i">
                <img class="cover-img" src="../../../assets/placeholder.png" alt="">
                <!-- 正在直播 -->
                <p class="living" v-if="$route.params.type == 0">
                    <a>禁用聊天室</a><span> · </span>
                    <a >中断聊天室</a><span> · </span>
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
            <div class="con-page">
                <el-pagination
                        layout="prev, pager, next, jumper"
                        :total="total"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                >
                </el-pagination>
            </div>
        </div>

        <div >
            <el-dialog :visible.sync="editLiveDialogVisible" :show-close="false">
                <div class="gift-edit">
                    <h3>主播</h3>
                    <input class="text" type="text" placeholder="单行输入">
                    <h3>直播标题</h3>
                    <input class="text" type="text" placeholder="单行输入">
                    <h3>直播封面</h3>
                    <div class="img">
                        <img id="coverImg" src="../../../assets/placeholder.png" alt="">
                        <div class="upload">
                            <el-button icon="upload2">上传</el-button>
                            <input type="file" class="file" @change="fileUpload">
                        </div>
                    </div>
                    <h3>分类</h3>
                    <input class="text" type="text" placeholder="">
                    <h3>标签</h3>
                    <h3>置顶（1－10）</h3>
                    <input class="text" type="text" placeholder="无">
                </div>
                <div slot="title" class="dialog-title">
                    编辑直播信息
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="editLiveDialogVisible = false">保　存</el-button>
                    <el-button @click="editLiveDialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'liveManage',
        props: {},
        data() {
            return {
                dropDownMenu: ['正在直播', '禁播频道', '聊天室禁用', '直播举报'],
                dropDownMenuItem: 0,
                searchValue: '',
                liveData: [
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    {id: 1, img: ''},
                    ],
                currentPage: 1,
                total:50,
                editLiveDialogVisible: false
            }
        },
        computed: {},
        methods: {
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
            editLiveHandle(item) {
                this.editLiveDialogVisible = true
            },
            fileUpload(e) {
                let f = e.target.files[0];
                let r = new FileReader();
                let that = this;
                let imgDom = document.getElementById('coverImg');

                r.readAsDataURL(f)
                r.onload = function () {
                    imgDom.src = r.result
                }
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


    .gift-edit {
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
                width: 114px;
                height: 78px;
            }
            .upload {
                position: relative;
                display: inline-block;
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