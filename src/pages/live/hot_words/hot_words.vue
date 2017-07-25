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

                <div class="con-col-item  con-col-active" @click="hotWordsPage">搜索热词设置</div>
                <div class="con-col-item" @click="gitManagePage">礼物管理</div>
            </div>
        </div>
        <div class="label">

            <p class="tips">注：单个热词内容不宜太长，热词总数前端仅显示三行，超出部分不显示</p>
            <div class="tags">
                <el-tag
                        :key="tag"
                        v-for="tag in hotWord"
                        :closable="true"
                        :close-transition="false"
                        @close="handleClose(tag)"
                        class="tags-item"
                >
                    {{tag.word}}
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
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'hotWords',
        props: {},
        data() {
            return {
                dropDownMenu: ['全部用户', '禁用用户', '全部主播', '主播申请列表'],
                dropDownMenuItem: 0,
                inputVisible: false,
                inputValue: ''
            }
        },
        computed: {
            ...mapState('live', [
                'hotWord',
                'hotWordSuccess'
            ])
        },
        watch: {
            hotWordSuccess(me) {
                if (me) {
                    this.ac_hot_word_list()
                }
            }
        },
        methods: {
            ...mapActions('live', [
                'ac_hot_word_add',
                'ac_hot_word_list',
                'ac_hot_word_remove',
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
            handleClose(tag) {
//                this.hotWord.splice(this.hotWord.indexOf(tag), 1);
                this.ac_hot_word_remove({id: tag.id})
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
//                    this.hotWord.push(inputValue);
                    this.ac_hot_word_add({word: inputValue})
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.ac_hot_word_list()
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
    .label {
        padding: 10px 20px;
        .tips {
            margin: 10px 0;
            font-weight: bold;
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