<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    .app {
        width: 100%;
        max-width: 1440px;
        min-width: 950px;
        overflow: hidden;
        margin: 0 auto;
    }
</style>