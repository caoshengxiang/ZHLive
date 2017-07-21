<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <span class="con-top-title">编辑分类</span>
            </div>
        </div>
        <div class="con"
             v-for="(item, i) in classifyLists"
             :key="i"
             v-if="item.id === $route.params.id">
            <h3 class="cla-1">一级分类:</h3>
            <p class="cla-1-name">
                <input type="text" v-model="modifyData.name">
            </p>
            <h3 class="cla-2">二级分类:</h3>
            <div class="cla-2-box">
                <div class="add" @click="addClassifyHandle">
                    <i class="el-icon-plus"></i>
                </div>
                <!-- 添加 -->
                <div class="col" v-for="(addItem, i) in addChild" :key="i">
                    <img
                            v-if="addItem.icon"
                            :src="addItem.icon" alt=""
                            v-model="addItem.icon">
                    <div v-else class="default-img"><i class="el-icon-upload"></i></div>

                    <p class="cla-2-name add-name">
                        <input v-model="addItem.name" placeholder="二级分类名">
                    </p>
                    <input type="file" class="file" @change="addClassifyImg($event, addItem)">
                    <div class="cover-del"><i class="el-icon-close" @click="delAddClassify2(addItem, i)"></i></div>
                </div>
                <!-- 修改 -->
                <div class="col" v-for="(item2, i) in modifyData.child" :key="i">
                    <div v-if="item2.id">
                        <img v-if="item2.icon" :src="item2.icon" v-model="item2.icon" alt="">
                        <div v-else class="default-img old"><i class="el-icon-upload"></i></div>
                        <p class="cla-2-name"><input placeholder="请输入" v-model="item2.name"></p>
                        <input type="file" class="file" @change="addClassifyImg($event, item2)">
                        <div class="cover-del" @click="delOldClassify(item2)"><i class="el-icon-close"></i></div>
                    </div>
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
        name: 'editClassify',
        props: {},
        data() {
            return {
                modifyData: {
                    id: '',
                    name: '',
//                    icon: '',
                    delChild: [],
                    child: [],
                },
                addChild: []
            }
        },
        computed: {
            ...mapState('category', [
                'editSuccess',
                'classifyLists',
            ])
        },
        watch: {
            editSuccess(me) { // 保存成功返回列表
                if (me === 1) {
                    this.backList()
                } else if (me === 616) {
                    this.$message.error('修改失败,图片错误')
                }
            },
        },
        methods: {
            ...mapActions('category', [
                'ac_add_classify',
                'ac_modify_classify'
            ]),
            ...mapMutations('category' ,[
                'mut_edit_classify_success'
            ]),
            addClassifyHandle() {
                this.addChild.unshift({icon: '', name: ''})
            },
            delAddClassify2(item, i) {
//                console.log('add',item, i)
                this.addChild.splice(i, 1)
            },
            delOldClassify(cla2) {
//                console.log('cla2',cla2)
                this.modifyData.child.forEach((item, i, arr) => {
                    if (item.id === cla2.id) {
                        arr.splice(i, 1);
                        this.modifyData.delChild.push(cla2.id)
                    }
                })

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
                let isAddImg = true

                if (this.addChild.length) { // 有添加有修改,添加需要验证图片是否添加
                    this.addChild.forEach((item)=>{
                        if (!item.icon) {
                            isAddImg = false
                        }
                    })
                    if (isAddImg) { // 验证图片是否上传
                        this.modifyData.child = [...this.modifyData.child, ...this.addChild]
                        this.ac_modify_classify(this.modifyData)
                    } else {
                        this.$message({
                            message: '请上传分类图片!',
                            type: 'warning'
                        });
                    }

                } else { // 之修改
                    this.ac_modify_classify(this.modifyData)
                }
            },
            backList() {
                this.$router.go(-1)
            },
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.mut_edit_classify_success(0);
        },
        beforeMount() {
        },
        mounted() {
            let editClassify = this.classifyLists.filter((item)=>{
                if (item.id === this.$route.params.id) {
                    return item
                }
            })

//            console.log(editClassify)
            this.modifyData.child = editClassify[0].child
            this.modifyData.name = editClassify[0].name
            this.modifyData.id = editClassify[0].id
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
                    &.old {
                        width: 80.5px;
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