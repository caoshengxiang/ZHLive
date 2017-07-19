<!--suppress ALL -->
<template>
    <div>
        <button @click="change">change</button>
        {{te}}
        <input type="file" id="file" @change="handleFile">
        <img :src="imgUrl" alt="">

        <!-- vue2-editor -->
        <div style="width: 600px;">
            <vue-editor v-model="content"></vue-editor>
        </div>
    </div>
</template>
<script>
    import { VueEditor } from 'vue2-editor'
    export default {
        name: 'Test',
        data() {
            return {
                te: 1,
                imgUrl: '',
                content: ''
            }
        },
        methods: {
            change() {
                this.te  = 2;
            },
            handleFile(e){
                let r= new FileReader();
                let f = e.target.files[0];
                let that = this;

                r.readAsDataURL(f);
                r.onload = function () {
                    that.imgUrl = this.result;
                };
            }
        },
        watch: {
            te(va) {
                console.log(va)
            }
        },
        components: {
            VueEditor
        },
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>

</style>
