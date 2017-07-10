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
        min-height: 810px;
    }
    .con {
        padding-top: 36px;
        min-height: 810px;
        background:#c1b8b8;
    }
    .menu-box {
        width: 200px;
        float: left;
    }
    .container-r {
        margin-left: 200px;
        background: #fff;
        margin-right: 20px;
        min-height: 680px;
    }
</style>