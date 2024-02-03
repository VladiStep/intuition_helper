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
        max-height: 450px;
    }
</style>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    
    const scenes = ["SceneFirst"];
    const goToNextScene = () => {
        if (currentSceneIndex.value < scenes.length - 1) {
            currentSceneIndex.value++;
        }
    };
    const goToPrevScene = () => {
        if (currentSceneIndex.value > 0) {
            currentSceneIndex.value--;
        }
    };

    /** Список введённых вопросов */
    const questions = ref(new Array<string>());

    const currentSceneIndex = ref(0);
    const currentScene = computed(() => scenes[currentSceneIndex.value]);
</script>