<template>
    <div>
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

    .con {
        padding-top: 36px;
    }
    .menu-box {
        width: 200px;
        float: left;
    }
    .container-r {
        margin-left: 200px;

    }
</style>