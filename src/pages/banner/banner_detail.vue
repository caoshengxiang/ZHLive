<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <a class="con-top-back" @click="backList">返回列表</a>
            </div>
        </div>
        <div class="con">
            <img class="head-img" src="../../assets/placeholder.png" alt="">
            <ul class="detail">
                <li>
                    <span>链接类型:</span>
                    <span>{{}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'bannerDetail',
        props: {},
        data() {
            return {}
        },
        computed: {

        },
        methods: {
            ...mapActions({

            }),
            backList() {
                this.$router.go(-1);
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

    .con {
        padding: 30px;
        .head-img {
            width: 110px;
            height: 110px;
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
</style>