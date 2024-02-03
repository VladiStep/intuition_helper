<template>
    <div class="sceneCont">
        <div class="title">Помощник интуиции</div>
        <div class="buttonsCont">
            <Btn @click="nextBtnClickHandler">Следующий шаг</Btn>
            <Btn @click="manualBtnClickHandler">Как пользоваться?</Btn>
            <Btn @click="addBtnClickHandler">Добавить вопрос</Btn>
        </div>
        <div class="questionsCont">
            <div class="questionCont" v-for="(question, index) in questions">
                <Question :questionText="question" @onRemoveClick="removeQuestClickHandler(index)" />
            </div>
        </div>
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
    import { ref } from 'vue';

    /** Список введённых вопросов */
    const questions = ref(["1234556", "134215211"]);

    const nextBtnClickHandler = () => {

    };

    const manualBtnClickHandler = () => {

    };

    const addBtnClickHandler = () => {
        questions.value.push("");
    };
    const removeQuestClickHandler = (questionIndex: number) => {
        questions.value.splice(questionIndex, 1);
    };
</script>