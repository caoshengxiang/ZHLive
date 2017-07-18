<template>
    <div>
        <div class="con-top">
            <a class="con-top-title" @click="backList">返回列表</a>
        </div>
        <div class="con">
            <img class="head-img" id="img" src="../../assets/placeholder.png" alt="">
            <div class="upload-file">
                <el-button icon="upload2">重新上传</el-button>
                <input type="file" class="file" id="file" @change="uploadImg">
            </div>
            <ul class="detail">
                <li>
                    <span>链接类型:</span>
                    <span>{{}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'editBanner',
        props: {},
        data() {
            return {
                banner: {
                    icon: '',

                }
            }
        },
        computed: {

        },
        methods: {
            ...mapActions({

            }),
            backList() {
                this.$router.go(-1);
            },
            uploadImg(e) {
                let f = document.getElementById('file').files[0];
                let r = new FileReader()

                r.readAsDataURL(f);
                r.onload = function () {
                    document.getElementById('img').src= r.result
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
    @import "../../styles/common";

    .con {
        padding: 30px;
        .head-img {
            width: 110px;
            height: 110px;
        }
        .upload-file {
            display: inline-block;
            position: relative;
            top: -10px;
            .file {
                width: 110px;
                height: 38px;
                overflow: hidden;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
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