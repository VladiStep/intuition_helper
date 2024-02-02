<template>
    <component id="mainCont" :is="currentScene" />
</template>

<style lang="scss" scoped>
    #mainCont {
        background-color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
        font-size: 26px;
        width: 650px;
        height: 500px;
        //height: 100px;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue';

    /** Список введённых вопросов */
    const questions = ref(new Array<string>());

    const currentScene = ref("SceneFirst");
</script>