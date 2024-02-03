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
                <Question :questionText="question.text" @onRemoveClick="removeQuestClickHandler(index)" />
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
    import { computed, reactive, ref } from 'vue';

    class Question {
        id: number;
        text: string;
        static lastId: number = 0;

        constructor(text: string = "") {
            this.id = Question.lastId++;
            this.text = text;
        }
    }

    const minQuestionCount = 2;
    const maxQuestionCount = 6;

    const showModal = ref(false);

    /** Список введённых вопросов */
    const questions = reactive<Question[]>(new Array<Question>(minQuestionCount));
    for (let i = 0; i < minQuestionCount; i++)
        questions[i] = new Question();
    console.log(Array.from(questions));

    const nextBtnClickHandler = () => {

    };

    const manualBtnClickHandler = () => {
        showModal.value = true;
    };

    const nextBtnDisabled = ref(true);

    const addBtnDisabled = computed(() => {
        return questions.length == maxQuestionCount;
    });

    const addBtnClickHandler = () => {
        if (questions.length < maxQuestionCount)
            questions.push(new Question());
    };
    const removeQuestClickHandler = (questionIndex: number) => {
        if (questions.length > minQuestionCount) {
            questions.splice(questionIndex, 1);
            Question.lastId--;
        }
    };
    const questTextInputHandler = () => {
        nextBtnDisabled.value = questions.every(q => q.text.length === 0);
        console.log(nextBtnDisabled.value);
    };
</script>