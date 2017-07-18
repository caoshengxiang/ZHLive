<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <a class="con-top-back" @click="backList">Banner编辑</a>
            </div>
        </div>
        <div class="con" v-for="item in edit_classify_detail" v-if="item.id === $route.params.id">
            <h3 class="cla-1">一级分类:</h3>
            <p class="cla-1-name">{{item.name}}</p>
            <h3 class="cla-2">二级分类:</h3>
            <div class="cla-2-box">
                <div class="col" v-for="(cla2, i) in item.child" :key="i">
                    <img :src="cla2.icon" alt="">
                    <p class="cla-2-name">{{cla2.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        name: 'showClassify',
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapState('category', [
                'classifyLists'
            ]),
            ...mapGetters('category', [
                'edit_classify_detail'
            ])

        },
        methods: {
            backList() {
                this.$router.go(-1)
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

    .con {
        .cla-1 {

        }
        .cla-1-name {
            margin: 20px 0;
        }
        .cla-2 {
            margin: 10px 0;
        }
        .cla-2-box {
            display: flex;
            flex-wrap: wrap;
            .col {
                margin-right: 20px;
                margin-bottom: 20px;
                img {
                    width: 82.5px;
                    height: 82.5px;
                }
                .cla-2-name {
                    width: 82.5px;
                    overflow: hidden;
                    text-align: center;
                }
            }
        }
    }
</style>