<template>
    <div>
        <div class="con-top">
            <div class="con-col">
                <div class="con-top-title">版本管理</div>
            </div>
            <div class="up">
                <a class="ios"><i class="el-icon-upload"></i>iOS</a>
                <a class="android"><i class="el-icon-upload"></i>Android</a>
            </div>
        </div>
        <div class="con-table">
            <table>
                <tr>
                    <th>版本编号</th>
                    <th>包名</th>
                    <th>上传时间</th>
                    <th>大小</th>
                    <th>所属平台</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item, index) in versionData" :key="index" class="border-bottom">
                    <td>{{item.num}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.size}}</td>
                    <td>{{item.type}}</td>
                    <td class="td-op">
                        <button v-if="item.type === 'iOS'" class="release-ios">发布</button>
                        <button v-else class="release-android">发布</button>
                        <button class="del">删除</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'version',
        props: {},
        data() {
            return {
                versionData: [
                    {num: 1, name: 'xxx', time: '2017-02-31- 11:50', size: '36k', type: 'iOS'},
                    {num: 1, name: 'xxx', time: '2017-02-31- 11:50', size: '36k', type: 'Android'},
                    {num: 1, name: 'xxx', time: '2017-02-31- 11:50', size: '36k', type: 'iOS'},
                    {num: 1, name: 'xxx', time: '2017-02-31- 11:50', size: '36k', type: 'iOS'},
                    {num: 1, name: 'xxx', time: '2017-02-31- 11:50', size: '36k', type: 'iOS'},
                ]
            }
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
<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../../styles/common";

    .con-top {
        .up {
            color: #fff;
            position: absolute;
            right: 30px;

            .ios {
                background: #000000;
                width: 118px;
                text-align: center;
                padding: 5px;
                display: inline-block;
                border-radius: 5px;
                margin-right: 10px;
                text-decoration: none;
                cursor: pointer;
            }
            .android {
                background: green;
                width: 118px;
                text-align: center;
                padding: 5px;
                display: inline-block;
                border-radius: 5px;
                text-decoration: none;
                cursor: pointer;
            }
        }
    }
    .con-table {
        .td-op {
            .release-ios {
                background: #000000;
            }
            .release-android {
                background: green;
            }
            .del {
                background: red;
            }
        }
    }
</style>