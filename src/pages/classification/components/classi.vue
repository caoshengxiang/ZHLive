<template>
    <div class="classify">
        <div class="item add"
             @click="addClassify">
            <i class="el-icon-plus color"></i>
        </div>
        <div class="item classify-item" v-for="item in classify" :key="item.id">
            <img class="img" src="../../../assets/placeholder.png" alt="">
            <div class="cla">
                <p class="cla-1">{{item.classifyName}}</p>
                <p class="cla-2"
                   style="display: -webkit-box;box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">
                    <span v-for="cla2 in item.classify2" :key="cla2">{{cla2}},</span>
                </p>
                <div class="cover">
                    <div class="left" @click="delClassify">删除</div>
                    <div class="right" @click="editClassify">编辑</div>
                </div>
            </div>
        </div>

        <div class="dialog">
            <el-dialog title="添加/修改分类" :visible.sync="dialogClassifyVisible">
                <div class="edit-classify">
                    <div class="item cla-1">
                        <span>一级分类:</span>
                        <input type="text" name="cla1" class="cla1" placeholder="单行输入">
                    </div>
                    <div class="item cla-2">
                        <span>二级分类:</span>
                        <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                :closable="true"
                                :close-transition="false"
                                @close="handleClose(tag)"
                                class="tag-item"
                        >
                            {{tag}}
                        </el-tag>
                        <div class="add-btn">
                            <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="mini"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 分类</el-button>
                        </div>
                    </div>
                    <div class="upload">
                        <img class="show-img" src="../../../assets/placeholder.png" alt="">
                        <input type="file">
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="dialogClassifyVisible = false">保存/保存修改</el-button>
                    <el-button @click="dialogClassifyVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'classi',
        props: {},
        data() {
            return {
                classify: [
                    {
                        id: 1,
                        classifyName: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                    {
                        id: 1,
                        classifyName: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                    {
                        id: 1,
                        classifyName: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                    {
                        id: 1,
                        classifyName: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                    {
                        id: 1,
                        classifyName: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                    {
                        id: 1,
                        classifyName: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                ],
                dialogClassifyVisible: false,
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: ''
            }
        },
        computed: {},
        methods: {
            addClassify() {
                this.dialogClassifyVisible = true
            },
            delClassify() {
                this.$confirm('确认删除分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editClassify() {
                this.dialogClassifyVisible = true
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;

                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
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
    .classify {
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        .item {
            width: 250px;
            height: 100px;
            position: relative;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .add {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffbb00;
            cursor: pointer;
            .color {
                color: #fff;
                font-size: 38px;
            }
        }
        .classify-item {
            display: flex;
            align-items: center;
            background: #ccbdbd;
            padding: 6px;
            box-sizing: border-box;
            .img {
                width: 75px;
                height: 75px;
            }
            .cla {
                margin-left: 5px;
                .cla-1 {
                    font-weight: bold;
                }
                .cla-2 {
                    /*超出3行显示点, 样式在标签中设置*/
                }
            }
            .cover {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0.85;
                display: flex;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                visibility: hidden;
                .left {
                    width: 50%;
                    height: 100%;
                    background: red;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .right {
                    width: 50%;
                    height: 100%;
                    background: #ff9900;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            &:hover {
                .cover {
                    visibility: visible;
                }

            }
        }
        .dialog {
            min-width: 450px;

            .edit-classify {
                min-width: 450px;
                .item {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 100%;
                    padding: 5px;

                    &.cla-1 {
                        height: 30px;
                        display: flex;
                        align-items: center;

                        input {
                            border: 0;
                            margin-left: 3px;
                            width: 70%;
                            padding: 3px;
                        }
                    }
                    &.cla-2 {
                        display: flex;
                        flex-wrap: wrap;
                        .tag-item {
                            margin-right: 10px;
                        }
                        .add-btn {

                        }
                    }

                }
                .upload {
                    .show-img {
                        width: 75px;
                        height: 75px;

                    }
                }


            }
        }
    }
</style>