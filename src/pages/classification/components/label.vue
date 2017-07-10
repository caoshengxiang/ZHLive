<template>
    <div class="label">
        <p class="tips">注：单个标签内容不宜太长,标签总数不易过多</p>
        <div class="tags">
            <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    :closable="true"
                    :close-transition="false"
                    @close="handleClose(tag)"
                    class="tags-item"
            >
                {{tag}}
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
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </span>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'label',
        props: {},
        data() {
            return {
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: ''
            }
        },
        computed: {},
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
<style lang="scss" rel="stylesheet/scss" scoped>
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