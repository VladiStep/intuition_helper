<template>
    <div class="sceneCont">
        <div class="title">Помощник интуиции</div>
        <div class="buttonsCont">
            <Btn iconName="next" @click="nextBtnClickHandler" :disabled="nextBtnDisabled">Следующий шаг</Btn>
            <Btn iconName="question" @click="manualBtnClickHandler">Как пользоваться?</Btn>
            <Btn iconName="add" @click="addBtnClickHandler" :disabled="addBtnDisabled">Добавить вопрос</Btn>
        </div>
        <div class="questionsCont">
            <div class="questionCont" v-for="(question, index) in store.questions" :key="index">
                <Question :question="question" :canRemove="canRemove" @onRemoveClick="removeQuestClickHandler(index)" />
            </div>
        </div>

        <ModalWindow ref="modalWindow" v-model="showModal" />
    </div>
</template>

<style lang="scss" scoped>
    .sceneCont {
        display: flex;
        flex-direction: column;
    }

    .title {
        color: #535bd0;
        margin-bottom: 0.846rem;
    }

    .buttonsCont {
        display: flex;
        gap: 3px;
        margin-bottom: 0.3rem;

        :nth-child(2) {
            margin-right: auto;
        }
    }

    .questionsCont {
        border: solid yellowgreen 1px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 2px;
        gap: 0.65rem;
        overflow-y: overlay;
        min-height: 9.615rem;
    }
    .questionCont {
        height: 3.846rem;
        flex-shrink: 0;
    }
</style>

<script setup lang="ts">
    import { computed, onMounted, ref, watch } from "vue";
    import { useStore } from "./../../store";
    import ModalWindow from '../ModalWindow.vue';

    const store = useStore();

    const modalWindow = ref<InstanceType<typeof ModalWindow>>();
    const showModal = ref(false);

    const nextBtnClickHandler = () => {
        store.questionRandomKeys = Array.from(store.questions.keys()); // [0, 1, 2, 3...]
        store.questionRandomKeys.sort(() => 0.5 - Math.random());

        store.currentScene = "QuestionsScene";
    };

    const manualBtnClickHandler = () => {
        showModal.value = true;
    };

    const nextBtnDisabled = ref(true);

    const addBtnDisabled = computed(() => {
        return store.questions.length === store.maxQuestionCount;
    });

    /** Включена ли кнопка удаления у каждого вопроса */
    const canRemove = computed(() => {
        return store.questions.length === store.minQuestionCount;
    });

    const addBtnClickHandler = () => {
        if (store.questions.length < store.maxQuestionCount)
            store.questions.push({ id: store.lastQuestionId++, text: "" });
    };

    const removeQuestClickHandler = (questionIndex: number) => {
        if (store.questions.length > store.minQuestionCount) {
            store.questions.splice(questionIndex, 1);
            store.lastQuestionId--;
        }
    };
    
    watch(() => store.anyQuestionIsEmpty, () => {
        nextBtnDisabled.value = store.anyQuestionIsEmpty;
    });
    onMounted(() => {
        nextBtnDisabled.value = store.anyQuestionIsEmpty;
    });
</script>