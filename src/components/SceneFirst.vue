<template>
    <div class="sceneCont">
        <div class="title">Помощник интуиции</div>
        <div class="buttonsCont">
            <Btn @click="handleNextBtnClick">Следующий шаг</Btn>
            <Btn @click="handleManualBtnClick">Как пользоваться?</Btn>
            <Btn @click="handleAddBtnClick">Добавить вопрос</Btn>
        </div>
        <div class="questionsCont">
            <div class="questionCont" v-for="(question, index) in questions">
                <Question :questionText="question" />
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
    }
    .questionCont {
        height: 100px;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue';

    /** Список введённых вопросов */
    const questions = ref(["1234556", "134215211"]);

    const handleNextBtnClick = () => {

    };

    const handleManualBtnClick = () => {

    };

    const handleAddBtnClick = () => {

    };
</script>