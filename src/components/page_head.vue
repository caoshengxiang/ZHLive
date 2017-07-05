<template>
    <div class="head">
        <span class="title">铸魂直播-后端管理</span>
        <span class="wel">{{username}}‧<a>退出登录</a></span>
    </div>
</template>
<script>

    export default {
        name: '',
        props: {},
        data() {
            return {
                username: 'allen'
            }
        },
        computed: {},
        methods: {},
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
    .head {
        background: #000000;
        color: #fff;
        padding: 16px 20px;
        .wel {
            float: right;
            margin-right: 50px;
        }
    }
</style>