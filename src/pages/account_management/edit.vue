<template>
    <div>
        <div class="top">编辑用户资料</div>
        <div class="con">
            <div>
                <img class="head-img" id="headImg" :src="userInfo.icon" alt="头像">
                <div class="upload">
                    <el-button class="bt" icon="upload2">重新上传</el-button>
                    <input type="file" id="file" class="file" name="file" @change="handleFile">
                </div>
            </div>
            <ul class="detail">
                <li>
                    <span class="l">用户编号:</span>
                    <span class="r">{{userInfo.userId}}</span>
                </li>
                <li>
                    <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</span>
                    <span class="r"><input type="text" :placeholder="userInfo.nickname"
                                           v-model="detail.nickname"></span>
                </li>
                <li>
                    <span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span>
                    <span class="r">{{userInfo.phoneNum}}</span>
                </li>
                <li>
                    <span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:</span>
                    <span class="r birth">
                        {{userInfo.age}}&nbsp;&nbsp;({{userInfo.birthday}})
                        <el-date-picker
                                class="data-p"
                                v-model="pickBirthDate"
                                type="date"
                                placeholder="出生日期"
                                :picker-options="pickerOptions0"
                        >
                        </el-date-picker>
                    </span>
                </li>
                <li>
                    <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                    <span class="r">
                        <!--<input type="text" :placeholder="userInfo.gender === 'MALE'?'男':'nv'">-->
                        <el-radio-group v-model="detail.gender">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </span>
                </li>
                <li>
                    <span>注册时间:</span>
                    <span class="r">{{userInfo.createTime}}</span>
                </li>
                <li>
                    <span>个人简介:</span>
                    <span class="r"><input type="text" :placeholder="userInfo.signature"
                                           v-model="detail.signature"></span>
                </li>
                <li class="line"></li>
                <li>
                    <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
                    <span class="r"><input type="text" :placeholder="userInfo.name" v-model="detail.name"></span>
                </li>
                <li>
                    <span>身份证号:</span>
                    <span class="r"><input type="text" :placeholder="userInfo.idNum" v-model="detail.idNum"></span>
                </li>
            </ul>
            <div class="op">
                <button class="save" @click="save">保存</button>
                <button class="cancel" @click="backList">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import * as utils from '../../utils/utils'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: 'edit',
        props: {},
        data() {
            return {
                pickBirthDate: '', // 插件的时间戳
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                detail: {
                    userId: '',
                    icon: '',
                    nickname: '',
                    age: '',
                    birthday: '',
                    gender: '',
                    signature: '',
                    name: '',
                    idNum: ''
                }
            }
        },
        watch: {
            pickBirthDate(val) {
                this.detail.birthday = utils.yyyymmdd(val)
                this.userInfo.age = utils.date2age(val)
                this.userInfo.birthday = utils.yyyymmdd(val)
            }
        },
        computed: {
            ...mapGetters('account', [
                'getters_userInfo'
            ]),
            userInfo() {
                this.detail = {
                    userId: this.getters_userInfo.userId,
                    icon: this.getters_userInfo.icon,
                    nickname: this.getters_userInfo.nickname,
                    age: this.getters_userInfo.age,
                    birthday: this.getters_userInfo.birthday,
                    gender: this.getters_userInfo.gender,
                    signature: this.getters_userInfo.signature,
                    name: this.getters_userInfo.name,
                    idNum: this.getters_userInfo.idNum
                }
                return this.getters_userInfo
//                return this.$store.getters.account.getters_userInfo
            }
        },
        methods: {
            ...mapActions({
                user_info: 'account/ac_userInfo',
                ac_modify_user: 'account/ac_modify_user'
            }),
            backList() {
                this.$router.go(-1);
            },
            save() {
                this.ac_modify_user(this.detail).then(()=>{
                    this.$router.go(-1);
                })
            },
            handleFile() { // 前端预览图片
                let f = document.getElementById('file').files[0];
                let img = document.getElementById('headImg');
                let r= new FileReader();
                let that = this;

                r.readAsDataURL(f);
                r.onload = function () {
                    let index = this.result.indexOf('base64,');

                    img.src = this.result;
//                    console.log(f)
                    console.log(this)
                    console.log(index)
                    that.detail.icon = this.result.substring(index + 7, this.result.length)
//                    console.log(that.detail.icon)
                };

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
    @import "../../styles/mixin";

    .con {
        padding: 30px;
        .top {
            @include top-box;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #fff;

        }
        .head-img {
            width: 110px;
            height: 110px;

        }
        .upload {
            display: inline-block;
            position: relative;
            bottom: 36px;
            width: 110px;
            margin-left: 10px;
            .bt {
                position: absolute;
            }
            .file {
                opacity: 0;
                position: absolute;
                width: 110px;
                height: 36px;
            }
        }

        .detail {
            li {
                margin: 8px 0;
                font-size: 14px;
                input {
                    width: 410px;
                    padding: 3px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                .r {
                    margin-left: 10px;
                    position: relative;
                    .data-p {
                        opacity: 0;
                        position: absolute;
                        left: 0px;
                        cursor: pointer;
                    }

                    &.birth {
                        border: 1px solid #ccc;
                        padding: 3px 5px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    ::-webkit-input-placeholder { /* WebKit browsers */
                        color: #000;
                    }
                    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                        color: #000;
                    }
                    ::-moz-placeholder { /* Mozilla Firefox 19+ */
                        color: #000;
                    }
                    :-ms-input-placeholder { /* Internet Explorer 10+ */
                        color: #000;
                    }
                }
            }
            .line {
                border-bottom: 1px solid #ccc;
                margin: 20px 0;
            }
        }
        .op {
            margin-top: 40px;
            .save {
                width: 96px;
                background: #ff5d00;
                color: #fff;
                border: 0;
                padding: 3px;
                border-radius: 5px;
                margin-right: 20px;
            }
            .cancel {
                width: 50px;
                border: 1px solid #ccc;
                padding: 3px;
                border-radius: 5px;
            }
        }
    }
</style>