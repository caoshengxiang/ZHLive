<template>
    <div class="classify">
        <div class="add item"><i class="el-icon-plus color"></i></div>
        <div class="item">
            <img class="img" src="../../../assets/placeholder.png" alt="">
            <div class="level">
                <p class="level-1" >一级分类</p>
                <p class="level-2">
                    二级分类，二级分类，二级分类，二级分类，二级分类，二级分类，
                    二级分类，二级分类，二级分类，
                </p>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'classi',
        props: {},
        data() {
            return {}
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
<style lang="scss" rel="stylesheet/scss" scoped>
    .classify {
        padding: 20px;
        .item {
            width: 250px;
            height: 100px;
            display: inline-block;
        }
        .add {
            background: #ffa726;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .color {
                color: #fff;
                font-size: 30px;
           }
        }
    }
</style>