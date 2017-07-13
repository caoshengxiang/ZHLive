<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item con-col-active" @click="classifyPage">分类管理</div>
                <div class="con-col-item" @click="tagsPage">标签管理</div>
            </div>
            <a class="add" @click="editClassify(-99)">+ 添加分类</a>
        </div>
        <div class="con-table">
            <table>
                <tr>
                    <th>一级分类</th>
                    <th>二级分类</th>
                    <th>操作</th>
                </tr>
                <tr class="border-bottom" v-for="(item, index) in classifyLists" :key="index">
                    <td>{{item.name}}</td>
                    <td><span v-for="(cla2, i2) in item.child" :key="i2">{{cla2.name}}, </span></td>
                    <td class="op">
                        <a class="op-1" @click="showClassify(item)">查看</a>
                        <a class="op-2" @click="editClassify(item)">编辑</a>
                        <a class="op-3" @click="delClassify(item)">删除</a>
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
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'classify',
        props: {},
        data() {
            return {
                currentPage: 1,
                total: 5
            }
        },
        computed: {
            ...mapState('category', [
                'classifyLists',
                'delClassifySuccessBack'
            ])
        },
        watch: {
            delClassifySuccessBack(me) {
                if (me) {
                    this.ac_classify_list({pageIndex: 1, pageSize: 10}).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }
            }
        },
        methods: {
            ...mapActions('category', [
                'ac_classify_list',
                'ac_del_classify'
            ]),
            classifyPage() {
                this.$router.push({name: 'classification'})
            },
            tagsPage() {
                this.$router.push({name: 'tags'})
            },
            showClassify(item) {
                this.$router.push({name: 'showClassify', params: {id: item.id}})
            },
            editClassify(item) {
                if (item === -99) {
                    this.$router.push({name: 'addClassify'})
                } else {
                    this.$router.push({name: 'editClassify', params: {id: item.id}})
                }

            },
            delClassify(item) {
                this.$confirm('确认删除分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ac_del_classify({id: item.id})

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleCurrentChange(va) {

            }

        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.ac_classify_list({pageIndex: 1, pageSize: 10})
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