<template>
    <div class="menu">
        <ul>
            <li @click="changeMenu(0)" :class="{active: isActive[0]}">帐号管理</li>
            <li @click="changeMenu(1)" :class="{active: isActive[1]}">分类管理</li>
            <li @click="changeMenu(2)" :class="{active: isActive[2]}">直播管理</li>
            <li @click="changeMenu(3)" :class="{active: isActive[3]}">支付管理</li>
            <li @click="changeMenu(4)" :class="{active: isActive[4]}">Banner管理</li>
            <li @click="changeMenu(5)" :class="{active: isActive[5]}">举报/反馈</li>
            <li @click="changeMenu(6)" :class="{active: isActive[6]}">版本管理</li>
        </ul>
    </div>
</template>
<script>

    export default {
        name: '',
        props: {},
        data() {
            return {
              isActive: [true, false, false, false, false, false, false],
            }
        },
        computed: {},
        methods: {
            changeMenu(i) {
                /*
                 * param i
                 * 0 帐号管理
                 * 1 分类管理
                 * 2 直播管理
                 * 3 支付管理
                 * 4 banner管理
                 * 5 举报反馈
                 * 6 版本管理
                 * */
                sessionStorage.menuIndex = i;
                switch (i) {
                    case 0:
                        this.$router.push({name: 'accountManagement', params: {type: 0,page: 1}})
                        this.setActive(0)
                        break;
                    case 1:
                        this.$router.push({name: 'classification'})
                        this.setActive(1)
                        break;
                    case 2:
                        this.$router.push({name: 'liveManage', params: {type: 0, page: 1}})
                        this.setActive(2)
                        break;
                    case 3:
                        this.$router.push({name: 'paymentManage'})
                        this.setActive(3)
                        break;
                    case 4:
                        this.$router.push({name: 'bannerManage', params: {type: 0, page: 1}})
                        this.setActive(4)
                        break;
                    case 5:
                        this.$router.push({name: 'reportManage', params: {page: 1}})
                        this.setActive(5)
                        break;
                    case 6:
                        this.$router.push({name: 'version'})
                        this.setActive(6)
                        break;
                    default:
//                        this.$router.push({name: 'accountManagement'})
//                        this.setActive(0)
                }
            },
            setActive(menuIndex) {
                let tempArr = [false, false, false, false, false, false, false]

                tempArr[menuIndex] = true
                this.isActive = tempArr // 改变this.isActive数组索引的值视图没有监听更新, 这里对数组重新赋值进行监听
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            if (sessionStorage.menuIndex) {
                // TODO 刷新页面导致页面回到菜单的第一个界面，试下用路由参数解决 (lunux下好像有时正常？？?)
//                this.changeMenu(parseInt(sessionStorage.menuIndex, 10))
                this.setActive(sessionStorage.menuIndex)
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
<style lang="sass" rel="stylesheet/scss" scoped>
    .menu {
        min-height: 300px;
        ul {
            width: 150px;
            margin: 0 auto;
            text-align: center;
            li {
                width: 100%;
                height: 28px;
                background: #fff;
                padding-top: 7px;
                margin-bottom: 5px;
                border-radius: 3px;
                font-size: 12px;
                cursor: pointer;
                &.active{
                    background: #ff5d00;
                    color: #fff;
                }
            }
        }
    }
</style>