<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-col-item" @click="classifyPage">分类管理</div>
                <div class="con-col-item con-col-active" @click="tagsPage">标签管理</div>
            </div>
        </div>
        <div class="label">

            <p class="tips">注：单个标签内容不宜太长,标签总数不易过多</p>
            <div class="tags">
                <el-tag
                        :key="tag.id"
                        v-for="tag in tags"
                        :closable="true"
                        :close-transition="false"
                        @close="handleClose(tag)"
                        class="tags-item"
                >
                    {{tag.name}}
                </el-tag>
                <span class="add-item">
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
                <el-button v-else class="button-new-tag" size="small" @click="showInput"> + 标 签 </el-button>
            </span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'label',
        props: {},
        data() {
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            }
        },
        computed: {
            ...mapState('category', [
                'tags',
                'tagsSuccessBack'
            ])
        },
        watch: {
            tagsSuccessBack(me) {
                if (me) {
                    this.ac_tags_list()
                }
            }
        },
        methods: {
            ...mapActions('category', [
                'ac_add_tags',
                'ac_tags_list',
                'ac_del_tags'
            ]),
            classifyPage() {
                this.$router.push({name: 'classification'})
            },
            tagsPage() {
                this.$router.push({name: 'tags'})
            },
            handleClose(tag) {
                this.ac_del_tags({id: tag.id})
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;

                if (inputValue) {
                    this.ac_add_tags({name: inputValue})

                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
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
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../styles/common";

    .label {
        padding: 10px 20px;
        .tips {
            margin: 10px 0;
        }
        .tags {
            .tags-item {
                display: inline-block;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .add-item {
                display: inline-block;
                width: 78px;
                margin-bottom: 10px;
            }
        }
    }
</style>