<template>
    <div class="sceneCont">
        <div class="title">Помощник интуиции</div>
        <div class="buttonsCont">
            <Btn @click="nextBtnClickHandler" :disabled="nextBtnDisabled">Следующий шаг</Btn>
            <Btn @click="manualBtnClickHandler">Как пользоваться?</Btn>
            <Btn @click="addBtnClickHandler" :disabled="addBtnDisabled">Добавить вопрос</Btn>
        </div>
        <div class="questionsCont">
            <div class="questionCont" v-for="(question, index) in questions" :key="index">
                <Question :question="question" @onRemoveClick="removeQuestClickHandler(index)"
                          @onTextInput="questTextInputHandler" />
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
        margin-bottom: 22px;
    }

    .buttonsCont {
        display: flex;
        gap: 3px;
        margin-bottom: 10px;

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
        gap: 20px;
        overflow-y: overlay;
        min-height: 250px;
    }
    .questionCont {
        height: 100px;
        flex-shrink: 0;
    }
</style>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    // "v-for" не поддерживает пользовательские классы (выдаёт ошибку)
    /*class Question {
        id: number;
        text: string;
        static lastId: number = 0;

        constructor(text: string = "") {
            this.id = Question.lastId++;
            this.text = text;
        }
    }*/
    let lastQuestId = 0;

    const minQuestionCount = 2;
    const maxQuestionCount = 6;

    const showModal = ref(false);

    /** Список введённых вопросов */
    const questions = ref(new Array<{id: number, text: string}>(minQuestionCount));
    for (let i = 0; i < minQuestionCount; i++)
        questions.value[i] = { id: lastQuestId++, text: "" };

    const nextBtnClickHandler = () => {

    };

    const manualBtnClickHandler = () => {
        showModal.value = true;
    };

    const nextBtnDisabled = ref(true);

    const addBtnDisabled = computed(() => {
        return questions.value.length == maxQuestionCount;
    });

    const addBtnClickHandler = () => {
        if (questions.value.length < maxQuestionCount)
            questions.value.push({ id: lastQuestId++, text: "" });
    };

    const removeQuestClickHandler = (questionIndex: number) => {
        if (questions.value.length > minQuestionCount) {
            questions.value.splice(questionIndex, 1);
            lastQuestId--;
        }
    };
    
    const questTextInputHandler = () => {
        nextBtnDisabled.value = questions.value.some(q => q.text.length === 0);
    };
</script>