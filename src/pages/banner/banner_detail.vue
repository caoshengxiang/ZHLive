<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <a class="con-top-back" @click="backList">返回列表</a>
            </div>
        </div>
        <div class="con">
            <img class="head-img" :src="bannerDetail.pic" alt="">
            <ul class="detail">
                <li>
                    <span>链接类型:</span>
                    <span v-if="bannerDetail.type === 'NONE'">无链接</span>
                    <span v-if="bannerDetail.type === 'TOLIVE'">内部直播 ({{bannerDetail.userNickname}}-{{bannerDetail.content}})</span>
                    <span v-if="bannerDetail.type === 'TOLINK'">外部直播 ({{bannerDetail.content}})</span>
                    <span v-if="bannerDetail.type === 'TOH5'">内部H5 <div v-html="bannerDetail.content" class="h5-page"></div></span>
                    <span v-if="!bannerDetail.type">未设置</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'bannerDetail',
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapState('banner', [
                'bannerDetail'
            ])
        },
        methods: {
            ...mapActions('banner', [
                'ac_banner_detail'
            ]),
            backList() {
                this.$router.go(-1);
            },
            getBannerDetail() { // 请求banner详细
                let routeParams = this.$route.params
                let category = ''

                switch (parseInt(routeParams.type, 10)) {
                    case 0:
                        category = 'HOT'
                        break;
                    case 1:
                        category = 'NEW'
                        break;
                    case 2:
                        category = 'NEARBY'
                        break;
                    case 3:
                        category = 'CARE'
                        break;
                    default:
                        category = 'HOT'
                }
                this.ac_banner_detail({category: category, bannerNum: routeParams.num})
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.getBannerDetail()
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

    .con {
        padding: 30px;
        .head-img {
            width: 423px;
            height: 165px;
        }
        .detail {
            li {
                margin: 5px 0;
                font-size: 14px;
            }
            .line {
                border-bottom: 1px solid #ccc;
                margin:10px 0;
            }
        }

    }

    .h5-page {
        width: 750px;
        padding: 20px;
        overflow: hidden;
        border: 1px solid #ccc;
        box-sizing: content-box;
        img {
            max-width: 100%;
        }
    }
</style>