<template>
    <component id="mainCont" :is="store.currentScene.value" />
</template>

<style lang="scss" scoped>
    #mainCont {
        // Параметры шрифта в "index.html"
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        min-width: 600px;
        max-width: 800px;
        max-height: 17.3rem;
    }

    @media only screen and (max-width: 615px) {
        #mainCont {
            min-width: auto;
            max-width: none;
        }
    }
</style>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { store } from './store.ts';

    store.questions = reactive(new Array<{id: number, text: string}>(store.minQuestionCount));
    for (let i = 0; i < store.minQuestionCount; i++)
        store.questions[i] = reactive({ id: store.lastQuestionId++, text: "" });
</script>