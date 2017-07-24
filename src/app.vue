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
        height: 100%;
        min-width: 950px;
        overflow: auto;
        margin: 0 auto;
    }
</style>