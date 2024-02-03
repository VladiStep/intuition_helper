<template>
    <component id="mainCont" :is="currentScene" />
    <Teleport to="body">
        <ModalWindow ref="modalWindow" :show="showModal" @close="showModal = false"
                     :header="modalHeader" :text="modalText" :footer="modalFooter" />
    </Teleport>
    
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

    const showModal = ref(false);
    const modalHeader = ref("");
    const modalText = ref("");
    const modalFooter = ref("");

    const scenes = ["SceneFirst"];
    const goToNextScene = () => {
        if (currentSceneIndex.value < scenes.length - 1) {
            currentSceneIndex.value++;
        }
    };

    function showMessage(message: string, title: string = "Сообщение", lowerText: string = "") {
        modalHeader.value = title;
        modalText.value = message;
        modalFooter.value = lowerText;

        showModal.value = true;
    }

    /** Список введённых вопросов */
    const questions = ref(new Array<string>());

    const currentSceneIndex = ref(0);
    const currentScene = computed(() => scenes[currentSceneIndex.value]);
</script>