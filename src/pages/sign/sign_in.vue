<template>
    <div class="sign-in">
        <h3 class="title">铸魂直播-后台</h3>
        <div class="form">
            <input type="text" placeholder="账户" v-model="username">
            <input type="password" placeholder="密码" v-model="password">
            <button @click="signIn">登录</button>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'signIn',
        props: {},
        data() {
            return {
                username: '',
                password: ''
            }
        },
        computed: {},
        methods: {
            signIn() {
                if (this.username && this.password) {
                    this.$store.dispatch('ac_user', {name: this.username, password: this.password}).then(() => {
                        this.$router.push({name: 'accountManagement', params: {type: 0, page: 1}})
                    })

                } else {
                    alert('输入账户/密码')
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
    .sign-in {
        text-align: center;
        .title {
            padding-top: 200px;
            padding-bottom: 100px;
            font-size: 35px;
        }
        .form {
            width: 385px;
            margin: 0 auto;
            input {
                width: 100%;
                height: 35px;
                margin-bottom: 30px;
                border-radius: 5px;
                border: 1px solid #000000;
                padding: 0 10px;
            }
            button {
                width: 160px;
                height: 35px;
                background: #000;
                color: #fff;
                border-radius: 5px;
                border: 0;
                cursor: pointer;
            }
        }
    }

</style>