<!--suppress ALL -->
<template>
    <div>
        <button @click="change">change</button>
        {{te}}
        <input type="file" id="file" @change="handleFile">
        <img :src="imgUrl" alt="">
    </div>
</template>
<script>
    export default {
        name: 'Test',
        data() {
            return {
                te: 1,
                imgUrl: ''
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
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>

</style>
