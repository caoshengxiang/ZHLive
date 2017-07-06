<template>
    <div>
        <div class="top">编辑用户资料</div>
        <div class="con">
            <div>
                <img class="head-img" src="../../assets/placeholder.png" alt="">
                <div class="upload">
                    <el-button class="bt" icon="upload2">重新上传</el-button>
                    <input type="file" class="file" name="file">
                </div>
            </div>
            <ul class="detail">
                <li>
                    <span class="l">用户编号:</span>
                    <span class="r">1111</span>
                </li>
                <li>
                    <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</span>
                    <span class="r"><input type="text" value="昵称"></span>
                </li>
                <li>
                    <span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span>
                    <span class="r">13300000000</span>
                </li>
                <li>
                    <span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:</span>
                    <span class="r birth">
                        {{age}}&nbsp;&nbsp;({{formatBirth}})
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
                    <span class="r"><input type="text" value="男"></span>
                </li>
                <li>
                    <span>注册时间:</span>
                    <span class="r"></span>
                </li>
                <li>
                    <span>个人简介:</span>
                    <span class="r"><input type="text" value="12342134"></span>
                </li>
                <li class="line"></li>
                <li>
                    <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
                    <span class="r"><input type="text" value="allen"></span>
                </li>
                <li>
                    <span>身份证号:</span>
                    <span class="r"><input type="text" value="2983492384932"></span>
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
                birthDate: new Date('946656000000'), // 服务器获取
                age: '',
                formatBirth: '',
                detail: {id: 10,number: '000001', headImg: '', nickname: 'allen', tel: '17744332211', time: '946656000000', age: 19, sex: '男', name: '李小', intro: '你好', disable: false}
            }
        },
        watch: {
            pickBirthDate(val) {
                this.age = utils.date2age(val)
                this.formatBirth = utils.yyyymmdd(val)
            }
        },
        computed: {},
        methods: {
            backList() {
                this.$router.go(-1);
            },
            save() {

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
            this.age = utils.date2age(new Date( parseInt(this.detail.time, 10) ))
            this.formatBirth = utils.yyyymmdd(new Date(parseInt(this.detail.time, 10) + 24*3600*1000))
            this.pickBirthDate = new Date(parseInt(this.detail.time, 10))
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