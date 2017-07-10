<template>
    <div class="menu">
        <ul>
            <li @click="changeMenu(0)" :class="{active: isActive0}">帐号管理</li>
            <li @click="changeMenu(1)" :class="{active: isActive1}">分类管理</li>
            <li @click="changeMenu(2)" :class="{active: isActive2}">直播管理</li>
            <li @click="changeMenu(3)" :class="{active: isActive3}">支付管理</li>
            <li @click="changeMenu(4)" :class="{active: isActive4}">Banner管理</li>
            <li @click="changeMenu(5)" :class="{active: isActive5}">举报/反馈</li>
        </ul>
    </div>
</template>
<script>

    export default {
        name: '',
        props: {},
        data() {
            return {
//              isActive: [true, false, false, false, false, false],
                isActive0: true, // TODO 待优化
                isActive1: false,
                isActive2: false,
                isActive3: false,
                isActive4: false,
                isActive5: false,
            }
        },
        computed: {},
        methods: {
            changeMenu(i) {
                sessionStorage.menuIndex = i;
                switch (i) {
                    case 0:
                        this.$router.push({name: 'accountManagement', params: {type: 0,page: 1}})
                        this.setActive(0)
                        this.isActive0  = true
                        break;
                    case 1:
                        this.$router.push({name: 'classification'})
                        this.setActive(1)
                        this.isActive1  = true
                        break;
                    case 2:
                        this.$router.push({name: 'classification'})
                        this.setActive(2)
                        this.isActive2  = true
                        break;
                    case 3:
                        this.$router.push({name: 'classification'})
                        this.setActive(3)
                        this.isActive3  = true
                        break;
                    case 4:
                        this.$router.push({name: 'classification'})
                        this.setActive(4)
                        this.isActive4  = true
                        break;
                    case 5:
                        this.$router.push({name: 'classification'})
                        this.setActive(5)
                        this.isActive5  = true
                        break;
                    default:
//                        this.$router.push({name: 'accountManagement'})
//                        this.setActive(0)
//                        this.isActive0  = true
                }
            },
            setActive() {
//                let i;
//
//                for (i = 0; i < this.isActive.length; i++) {
//                    if (n === i) {
//                        this.isActive[i] = true
//                        alert(n)
//                    } else {
//                        this.isActive[i] = false
//                    }
//                }

                this.isActive0 = false;
                this.isActive1 = false;
                this.isActive2 = false;
                this.isActive3 = false;
                this.isActive4 = false;
                this.isActive5 = false;

            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            if (sessionStorage.menuIndex) {
                this.changeMenu(parseInt(sessionStorage.menuIndex, 10))
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
        background: grey;
        min-height: 300px;
        ul {
            width: 110px;
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