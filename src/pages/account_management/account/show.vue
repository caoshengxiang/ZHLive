<template>
    <div>
        <div class="top">
            <a class="back" @click="backList">返回列表</a>
        </div>
        <div class="con">
            <img class="head-img" src="../../../assets/placeholder.png" alt="">
            <ul class="detail">
                <li>
                    <span>用户编号:</span>
                    <span>{{userInfo.userId}}</span>
                </li>
                <li>
                    <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</span>
                    <span>{{userInfo.nickname}}</span>
                </li>
                <li>
                    <span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span>
                    <span>{{userInfo.phoneNum}}</span>
                </li>
                <li>
                    <span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:</span>
                    <span>{{userInfo.age}}</span>
                </li>
                <li>
                    <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                    <span>{{userInfo.gender === 'MALE'?'男':'女'}}</span>
                </li>
                <li>
                    <span>注册时间:</span>
                    <span>{{userInfo.createTime}}</span>
                </li>
                <li>
                    <span>个人简介:</span>
                    <span>{{userInfo.signature}}</span>
                </li>
                <li class="line"></li>
                <li>
                    <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
                    <span>{{userInfo.name}}</span>
                </li>
                <li>
                    <span>身份证号:</span>
                    <span>{{userInfo.idNum}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'show',
        props: {},
        data() {
            return {}
        },
        computed: {
            userInfo() {
                return this.$store.state.account.userInfo
            }
        },
        methods: {
            ...mapActions({
                user_info: 'account/ac_userInfo'
            }),
            backList() {
                this.$router.go(-1);
            }
        },
        components: {},
        beforeCreate(){
        },
        created() {
            this.user_info({userId: this.$route.params.id})
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