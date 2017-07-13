<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <span class="con-top-title">添加分类</span>
            </div>
        </div>
        <div class="con">
            <h3 class="cla-1">一级分类:</h3>
            <p class="cla-1-name">
                <input type="text" placeholder="一级分类名称" v-model="addData.name">
            </p>
            <h3 class="cla-2">二级分类:</h3>
            <div class="cla-2-box">
                <div class="add" @click="addClassifyHandle">
                    <i class="el-icon-plus"></i>
                </div>
                <!-- 添加 -->
                <div class="col" v-for="(item, i) in addData.child" :key="i">
                    <img
                            v-if="item.icon"
                            :src="item.icon" alt=""
                            v-model="addData.child[i].icon">
                    <div v-else class="default-img"><i class="el-icon-upload"></i></div>

                    <p class="cla-2-name add-name">
                        <input v-model="addData.child[i].name" placeholder="二级分类名">
                    </p>
                    <input type="file" class="file" @change="addClassifyImg($event, item)">
                    <div class="cover-del"><i class="el-icon-close" @click="delClassify2(i)"></i></div>
                </div>
            </div>
            <div class="op">
                <el-button class="save" type="danger" @click="saveClassify">保存</el-button>
                <el-button class="back" @click="backList">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'addClassify',
        props: {},
        data() {
            return {
                addData: {
//                    id: '',
                    name: '',
//                    icon: '',
//                    delChild: '',
                    child: []
                }
            }
        },
        computed: {
            ...mapState('category', [
                'editSuccess',
                'classifyLists'
            ])
        },
        watch: {
            editSuccess(me) { // 保存成功返回列表
                if (me) {
                    this.backList()
                }
            }
        },
        methods: {
            ...mapActions('category', [
                'ac_add_classify'
            ]),
            ...mapMutations('category' ,[
                'mut_edit_classify_success'
            ]),
            addClassifyHandle() {
                this.addData.child.unshift({icon: '', name: ''})
            },
            delClassify2(i) {
                this.addData.child.splice(i, 1)
            },
            addClassifyImg(e, item) {
                let r = new FileReader();
                let f = e.target.files[0];

                r.readAsDataURL(f);
                r.onload = function () {
                    item.icon = r.result
                }
            },
            saveClassify() {
                    this.ac_add_classify(this.addData)
            },
            backList() {
                this.$router.go(-1)
            }

        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.mut_edit_classify_success(false);
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
        .cla-1 {

        }
        .cla-1-name {
            margin: 20px 0;
            input {
                padding: 3px 5px;
                border-radius: 3px;
                width: 400px;
                border: 1px solid #ccc;
            }
        }
        .cla-2 {
            margin: 10px 0;
        }
        .cla-2-box {
            display: flex;
            flex-wrap: wrap;
            .add {
                width: 82.5px;
                height: 103px;
                margin-right: 20px;
                margin-bottom: 20px;
                background: #ffae00;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                i {
                    color: #fff;
                    font-size: 20px;
                    font-weight: bold;
                }
            }
            .col {
                margin-right: 20px;
                margin-bottom: 20px;
                position: relative;
                img {
                    width: 82.5px;
                    height: 82.5px;
                }
                .default-img {
                    width: 82.5px;
                    height: 82.5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #ffae00;
                    i{
                        font-size: 34px;
                        color: #ffae00;
                    }
                }
                .add-name {
                    border: 1px solid #ffae00;
                    input {border: 0}
                }
                .cla-2-name {
                    width: 82.5px;
                    overflow: hidden;
                    text-align: center;
                    margin-top: -4px;
                    input {
                        width: 100%;
                        box-sizing: border-box;
                    }
                }
                .file {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 84px;
                    height: 84px;
                    overflow: hidden;
                    opacity: 0;
                }
                .cover-del {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: #8e8989;
                    cursor: pointer;
                    i{
                        font-size: 18px;
                        color: #ff4800;
                    }
                }
            }
        }
        .op {
            margin-top: 20px;
            .save {
                width: 120px;
            }
        }
    }
</style>