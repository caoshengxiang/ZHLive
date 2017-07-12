<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <el-dropdown
                        trigger="click"
                        @command="handleCommand"
                        class="drop-down">
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
                <div class="con-col-item con-col-active" @click="gitManagePage">礼物管理</div>
            </div>
        </div>
        <div class="con">
            <p class="tips">注意：礼物默认按价格排序，前端仅显示前８个礼物</p>
            <div class="gift-box">
                <div class="add" @click="editGiftHandle"><i class="el-icon-plus"></i></div>
                <div class="gift-item" v-for="i in 10">
                    <div class="gift-detail">
                        <img src="../../../assets/placeholder.png" alt="">
                        <p>魂币x9</p>
                        <p>礼物名称</p>
                    </div>
                    <div class="op">
                        <a class="dot del">删除</a>
                        <a class="edit" @click="editGiftHandle">编辑</a>
                    </div>
                </div>
            </div>
        </div>

        <div>

            <el-dialog :visible.sync="giftEditDialogVisible" :show-close="false">
                <div class="gift-edit">
                    <h3>礼物名称</h3>
                    <input class="text" type="text" placeholder="单行输入">
                    <h3>礼物名称</h3>
                    <input class="text" type="text" placeholder="单行输入">
                    <h3>礼物图片</h3>
                    <div class="img">
                        <img id="giftImg" src="../../../assets/placeholder.png" alt="">
                        <div class="upload">
                            <el-button icon="upload2">上传</el-button>
                            <input type="file" class="file" @change="fileUpload">
                        </div>
                    </div>
                </div>
                <div slot="title" class="dialog-title">
                    添加/编辑礼物信息
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="giftEditDialogVisible = false">保　存</el-button>
                    <el-button @click="giftEditDialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'giftManage',
        props: {},
        data() {
            return {
                dropDownMenu: ['全部用户', '禁用用户', '全部主播', '主播申请列表'],
                dropDownMenuItem: 0,
                giftEditDialogVisible: false
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
            editGiftHandle() {
                this.giftEditDialogVisible = true
            },
            fileUpload(e) {
                let f = e.target.files[0];
                let r = new FileReader();
                let that = this;
                let imgDom = document.getElementById('giftImg');

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
        .tips {
            margin: 10px 0;
        }
        .gift-box {
            display: flex;
            flex-wrap: wrap;
            .add {
                width: 168px;
                height: 180px;
                background: #ffaa00;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 20px;
                margin-bottom: 20px;
                i{
                    color: #fff;
                    font-weight: bold;
                    font-size: 30px;
                }
            }
            .gift-item {
                border: 1px solid #ccc;
                width: 165px;
                margin-right: 20px;
                margin-bottom: 20px;
                .gift-detail {
                    height: 150px;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 114px;
                        height: 78px;
                    }
                }
                .op {
                    text-align: right;
                    padding-right: 20px;
                    height: 30px;
                    .edit {
                        font-weight: bold;
                    }
                }
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