<template>
    <div class="head">
        <span class="title">铸魂直播-后端管理</span>
        <span class="wel">{{username}}‧<a @click="logoutHandle">退出登录</a></span>
    </div>
</template>
<script>

    export default {
        name: '',
        props: {},
        data() {
            return {

            }
        },
        computed: {
            username() {
                return this.$store.state.user
            }
        },
        methods: {
            logoutHandle() {
                sessionStorage.user = ''
                this.$router.push({name: 'signin'})
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
    .head {
        background: #000000;
        color: #fff;
        padding: 16px 20px;
        .wel {
            float: right;
            margin-right: 50px;
            a{
                cursor: pointer;
            }
        }
    }
</style>