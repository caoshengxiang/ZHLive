<template>
    <div>
        <div class="top">
            <a class="link"
               :class="{active: isActive}"
               @click="changeView(0)">分类管理</a>
            <a class="link"
               :class="{active: !isActive}"
               @click="changeView(1)">标签管理</a>
        </div>
        <div>
            <keep-alive>
                <component :is="currentView"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import classi from './components/classi.vue'
    import label from './components/label.vue'
    export default {
        name: 'classification',
        props: {},
        data() {
            return {
                currentView: classi,
                isActive: true
            }
        },
        computed: {},
        methods: {
            changeView(i) {
                if (i === 0) {
                    this.currentView = classi;
                    this.isActive = true
                } else {
                    this.currentView = label;
                    this.isActive = false
                }
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
    @import "../../styles/mixin";

    .top {
        @include top-box;
        display: flex;
        align-items: center;

        .link {
            width: 150px;
            padding: 5px;
            margin-left: 20px;
            background: #918c8c;
            text-align: center;
            color: #fff;
            font-size: 14px;
            text-decoration: none;
            cursor: pointer;
            border-radius: 5px;
            &.active {
                background: #5e5b5b;
            }
        }
    }
</style>