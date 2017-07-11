<template>
    <div>
        <div class="top">
            禁用用户
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
            <div class="btn">
                <a class="b-1" @click="enableUser(userInfo)">解禁</a>
                <a class="b-2" @click="backList">返回</a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'show',
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapState('account',[
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions({
                user_info: 'account/ac_userInfo'
            }),
            backList() {
                this.$router.go(-1);
            },
            enableUser(user) {

                this.$store.dispatch('account/ac_enableUser', {
                    param1: {
                        userId: user.userId
                    }
                }).then(()=>{
                    this.$message({message: '解禁成功', type: 'success'})
                })
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
        color: #fff;
        padding-left: 30px;

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
        .btn {
            margin-top: 30px;
            .b-1 {
                background: #999494;
                padding: 5px 30px;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                color: #fff;
            }
            .b-2 {
                margin-left: 10px;
                border: 1px solid #999494;
                padding: 5px 20px;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
            }
        }
    }
</style>