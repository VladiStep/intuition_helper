<template>
    <component id="mainCont" :is="store.currentScene" />
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
    import { reactive } from "vue";
    import { useStore } from "./store";
    import { storeToRefs } from "pinia";

    const store = useStore();
    const { minQuestionCount } = store;
    const { questions } = storeToRefs(store);

    questions.value = new Array<{id: number, text: string}>(minQuestionCount);
    for (let i = 0; i < minQuestionCount; i++)
        questions.value[i] = reactive({ id: store.lastQuestionId++, text: "" });
</script>