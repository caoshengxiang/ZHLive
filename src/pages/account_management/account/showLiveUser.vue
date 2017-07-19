<template>
    <div>

    </div>
</template>
<script>

    export default {
        name: 'show',
        props: {},
        data() {
            return {}
        },
        computed: {},
        methods: {
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
    @import "../../../styles/mixin";
    .top {
        @include top-box;
        display: flex;
        align-items: center;
        .back {
            background: #ff5d00;
            color: #fff;
            padding: 3px 50px;
            margin-left: 20px;
            border-radius: 3px;
            text-decoration: none;
            cursor: pointer;
        }
    }
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