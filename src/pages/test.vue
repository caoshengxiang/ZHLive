<!--suppress ALL -->
<template>
    <div>
        <button @click="change">change</button>
        {{te}}
    </div>
</template>
<script>
    export default {
        name: 'Test',
        data() {
            return {
                te: 1
            }
        },
        methods: {
            change() {
                this.te  = 2;
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
