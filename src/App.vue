<template>
    <component id="mainCont" :is="store.currentScene.value" />
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
        max-height: 450px;
    }
</style>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { store } from './store.ts';

    store.questions = reactive(new Array<{id: number, text: string}>(store.minQuestionCount));
    for (let i = 0; i < store.minQuestionCount; i++)
        store.questions[i] = reactive({ id: store.lastQuestionId++, text: "" });
</script>