<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <span class="con-top-title">Banner编辑</span>
            </div>
        </div>
        <div class="con">
            <h3>封面图</h3>
            <img class="head-img" id="img" src="../../assets/placeholder.png" alt="">
            <div class="upload-file">
                <el-button icon="upload2">重新上传</el-button>
                <input type="file" class="file" id="file" @change="uploadImg">
            </div>
            <ul class="detail">
                <h3>链接形式</h3>
                <li>
                    <el-radio-group v-model="linkType.type">
                        <div class="item">
                            <el-radio :label="1">无链接</el-radio>
                        </div>
                        <div class="item">
                            <div v-if="linkType.type === 2">
                                <el-radio :label="2">内部直播　<input type="text" v-model="linkType.content"
                                                                 placeholder="请输入正在直播用户的编号"></el-radio>
                            </div>
                            <div v-else>
                                <el-radio :label="2">内部直播</el-radio>
                            </div>
                        </div>
                        <div class="item">
                            <div v-if="linkType.type === 3">
                                <el-radio :label="3">外部链接　
                                    <input v-model="linkType.content"
                                           type="text"
                                           placeholder="请输入链接地址"></el-radio>
                            </div>
                            <div v-else>
                                <el-radio :label="3">外部链接</el-radio>
                            </div>
                        </div>
                        <div class="item">
                            <div v-if="linkType.type === 4">
                                <el-radio :label="4">内部H5: 请在下方编辑器中编辑H5页面</el-radio>
                                <div class="editor">
                                    <vue-editor v-model="linkType.content"></vue-editor>
                                </div>
                            </div>
                            <div v-else>
                                <el-radio :label="4">内部H5</el-radio>
                            </div>
                        </div>
                    </el-radio-group>
                </li>
            </ul>

            <div class="btn-group">
                <a class="save">保存</a>
                <a class="cancel" @click="backList">取消</a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { VueEditor } from 'vue2-editor'

    export default {
        name: 'editBanner',
        props: {},
        data() {
            return {
                banner: {
                    icon: '',

                },
                linkType: {
                    type: 1,
                    content: ''
                }
            }
        },
        computed: {},
        methods: {
            ...mapActions({}),
            backList() {
                this.$router.go(-1);
            },
            uploadImg(e) {
                let f = document.getElementById('file').files[0];
                let r = new FileReader()

                r.readAsDataURL(f);
                r.onload = function () {
                    document.getElementById('img').src = r.result
                }
            },
        },
        components: {
            VueEditor
        },
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
    @import "../../styles/common";

    .con {
        padding: 30px;
        h3 {
            margin-bottom: 20px;
        }
        .head-img {
            width: 423px;
            height: 165px;
        }
        .upload-file {
            display: inline-block;
            position: relative;
            top: -10px;
            .file {
                width: 110px;
                height: 38px;
                overflow: hidden;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
        .detail {
            li {
                margin: 5px 0;
                font-size: 14px;
            }
            .line {
                border-bottom: 1px solid #ccc;
                margin: 10px 0;
            }
            .item {
                margin: 10px 10px;
                input {
                    width: 415px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    padding: 3px 5px;
                }
                .editor {
                    /*width: 520px;*/
                    /*height: 320px;*/
                }
            }
        }
        .btn-group {
            margin-top: 30px;
            margin-left: 10px;
            .save {
                background: #ff6e00;
                color: #fff;
                padding: 6px 30px;
                border-radius: 5px;
                text-decoration: none;
                cursor: pointer;
            }
            .cancel {
                border: 1px solid #ccc;
                color: #888;
                border-radius: 5px;
                padding: 5px 20px;
                text-decoration: none;
                cursor: pointer;
                margin-left: 10px;
            }
        }
    }
</style>