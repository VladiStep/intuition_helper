<template>
    <component id="mainCont" :is="currentScene" />
</template>

<style lang="scss" scoped>
    #mainCont {
        background-color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
        font-size: 26px;
        width: 100%;
        height: 100%;
        min-width: 600px;
        max-width: 850px;
        max-height: 350px;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue';

    /** Список введённых вопросов */
    const questions = ref(new Array<string>());

    const currentScene = ref("SceneFirst");
</script>