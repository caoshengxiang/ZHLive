<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item con-col-active" @click="classifyPage">分类管理</div>
                <div class="con-col-item" @click="tagsPage">标签管理</div>
            </div>
            <a class="add">+ 添加分类</a>
        </div>
        <div class="con-table">
            <table>
                <tr>
                    <th>一级分类</th>
                    <th>二级分类</th>
                    <th>操作</th>
                </tr>
                <tr class="border-bottom" v-for="(item, index) in classify" :key="index">
                    <td>{{item.classify1}}</td>
                    <td><span v-for="(cla2, i2) in item.classify2" :key="i2">{{cla2}}, </span></td>
                    <td class="op">
                        <a class="op-1">查看</a>
                        <a class="op-2">编辑</a>
                        <a class="op-3">删除</a>
                    </td>
                </tr>
            </table>
        </div>
        <div class="con-page" v-show="total > 10">
            <el-pagination
                    layout="prev, pager, next, jumper"
                    :total="total"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'classify',
        props: {},
        data() {
            return {
                classify: [
                    {
                        id: 1,
                        classify1: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                    {
                        id: 2,
                        classify1: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                    {
                        id: 3,
                        classify1: '一级分类',
                        classify2: ['二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类', '二级分类']
                    },
                ],
                currentPage: 1,
                total: 5
            }
        },
        computed: {},
        methods: {
            classifyPage() {
                this.$router.push({name: 'classification'})
            },
            tagsPage() {
                this.$router.push({name: 'tags'})
            },
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
            },
            handleCurrentChange() {
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

    .con-top {
        .add {
            background: #ff6100;
            color: #fff;
            text-decoration: none;
            cursor: pointer;
            padding: 5px 40px;
            border-radius: 5px;
            position: absolute;
            right: 40px;
        }
    }
    .con-table {
        .op {
            color: #fff;
            .op-1 {
                background: #00c7ff;
                border-radius: 5px;
                padding: 5px 10px;
                cursor: pointer;
            }
            .op-2 {
                background: #ff7b00;
                margin-left: 10px;
                border-radius: 5px;
                padding: 5px 10px;
                cursor: pointer;
            }
            .op-3 {
                background: #000000;
                margin-left: 10px;
                border-radius: 5px;
                padding: 5px 10px;
                cursor: pointer;
            }
        }
    }
</style>