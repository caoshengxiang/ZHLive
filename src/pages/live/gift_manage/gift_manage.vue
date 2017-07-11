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

            <div class="search">
                <el-input
                        placeholder="用户昵称"
                        icon="search"
                        v-model="searchValue"
                        :on-icon-click="handleSearchClick">
                </el-input>
            </div>
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
                searchValue: '',
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
</style>