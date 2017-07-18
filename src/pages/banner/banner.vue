<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <el-dropdown
                        trigger="click"
                        @command="handleCommand"
                        class="drop-down-active">
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
            </div>
        </div>
        <div class="con-table">
            <table>
                <tr>
                    <th>序号</th>
                    <th>封面图</th>
                    <th>链接形式</th>
                    <th>操作</th>
                </tr>
                <tr class="border-bottom">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="td-op">
                        <button class="b-1" @click="bannerDetail">查看</button>
                        <button class="b-2" @click="bannerEdit">编辑</button>
                        <button class="b-3">隐藏</button>
                    </td>
                </tr>
                <tr class="border-bottom">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="td-op">
                        <button class="b-1" @click="bannerDetail">查看</button>
                        <button class="b-2" @click="bannerEdit">编辑</button>
                        <button class="b-3 b-3-h">显示</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'banner',
        props: {},
        data() {
            return {
                dropDownMenu: ['热门Banner', '最新Banner', '附近Banner', '关注Banner'],
                dropDownMenuItem: 0,
            }
        },
        computed: {},
        methods: {
            handleCommand(va) {
                this.$router.push({name: 'bannerManage', params: {type: va, page: 1}})
            },
            bannerDetail() {
                this.$router.push({name: 'bannerDetail'})
            },
            bannerEdit() {
                this.$router.push({name: 'editBanner', params: {id: 1}})
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
    @import "../../styles/common";
    .td-op {
        .b-1 {
            background: #00c7ff;
        }
        .b-2 {
            background: #ff5400;
        }
        .b-3 {
            background: forestgreen;
        }
        .b-3-h {
            opacity: 0.5;
        }
    }
</style>