<template>
    <div class="page">
        <page-head></page-head>
        <div class="con">
            <div class="menu-box">
                <left-menu></left-menu>
            </div>
            <div class="container-r">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import pageHead from '../components/page_head.vue'
    import leftMenu from '../components/left_menu.vue'
    export default {
        name: 'container',
        props: {},
        data() {
            return {

            }
        },
        computed: {},
        methods: {},
        components: {
            pageHead,
            leftMenu
        },
        beforeCreate(){
        },
        created() {
            if (sessionStorage.user) {
                this.$store.commit('mut_user', sessionStorage.user)
            }
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
    .page {
        height: 100%;
    }
    .con {
        padding-top: 36px;
        height: 100%;
        background: url("../assets/bg.jpg");
    }
    .menu-box {
        width: 260px;
        float: left;
    }
    .container-r {
        margin-left: 260px;
        background: #fff;
        margin-right: 60px;
        min-height: 760px;
    }
</style>