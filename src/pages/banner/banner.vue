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
                <tr class="border-bottom" v-for="item in bannerList" :key="item.id">
                    <td>{{item.id}}</td>
                    <td><img :src="item.pic" alt=""></td>
                    <td>{{item.type}}
                        <span v-if="item.type === 'NONE'">无链接</span>
                        <span v-if="item.type === 'TOLIVE'">内部直播</span>
                        <span v-if="item.type === 'TOLINK'">外部链接</span>
                        <span v-if="item.type === 'TOH5'">内部H5</span>
                        <span v-if="!item.type">未设置</span>
                    </td>
                    <td class="td-op">
                        <button class="b-1" @click="bannerDetail(item)">查看</button>
                        <button class="b-2" @click="bannerEdit(item)">编辑</button>
                        <button class="b-3" v-if="item.show" @click="bannerDisable(item)">隐藏</button>
                        <button class="b-3 b-3-h" v-else @click="bannerDisable(item)">显示</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'banner',
        props: {},
        data() {
            return {
                dropDownMenu: ['热门Banner', '最新Banner', '附近Banner', '关注Banner'],
                dropDownMenuItem: 0,
                /* banner 四种类型
                * HOT---热门
                * NEW---最新
                * NEARBY---附近
                * CARE---关注
                * */
                type: ['HOT', 'NEW', 'NEARBY', 'CARE'],
            }
        },
        computed: {
            ...mapState('banner', [
                'bannerList',
                'successBack'
            ]),
        },
        watch: {
            successBack(me) {
                if (me) {
                    let va = parseInt(this.$route.params.type, 10)

                    this.ac_banner_list({category: this.type[va]})
                }
            }
        },
        methods: {
            ...mapActions('banner', [
                'ac_banner_list',
                'ac_banner_disable',
            ]),
            handleCommand(va) {
                this.$router.push({name: 'bannerManage', params: {type: va, page: 1}})
                this.ac_banner_list({category: this.type[va]})
            },
            bannerDetail() {
                this.$router.push({name: 'bannerDetail'})
            },
            bannerEdit() {
                this.$router.push({name: 'editBanner', params: {id: 1}})
            },
            bannerDisable(item) { // banner显示隐藏
                this.ac_banner_disable({id: item.id, show: !item.show})
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.ac_banner_list({category: this.type[0]})
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