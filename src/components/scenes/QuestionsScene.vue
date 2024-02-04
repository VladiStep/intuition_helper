<template>
    <div class="sceneCont">
        <div class="status">Вопрос {{ questionIndex + 1 }} из {{ store.questions.length }}</div>
        <div class="hint">
            Ваша интуиция уже знает какой вопрос задан. Прислушайтесь к своим мыслям и ощущениям.
            Запишите всё в текстовое поле или сразу диктуйте в микрофон.
        </div>

        <TextField class="textField" v-model="store.answers[questionIndex].text"
                   placeholder="Введите текст ответа..." />
        
        <div class="bottomCont">
            <button class="button" @click="recordBtnClickHandler">
                <SVGIcon name="mic" :color="`${ isRecording ? 'orangered' : 'gray' }`"
                         :title="`${ isRecording ? 'Остановить' : 'Начать' } запись голоса`" />
            </button>

            <div class="recordTime">{{ recordTimeStr }}</div>
        </div>
        
        <ModalWindow ref="modalWindow" v-model="showModal" />
    </div>
</template>

<style lang="scss" scoped>
    .sceneCont {
        display: flex;
        flex-direction: column;
        max-width: 710px;
    }

    .status {
        color: black;
        margin-top: 6px;
        margin-bottom: 20px;
        font-size: 20px;
    }

    .hint {
        font-size: 16px;
        background-color: yellow;
        padding: 16px 10px;
        box-sizing: content-box;
        margin-bottom: 20px;
    }

    .textField {
        width: 100%;
        height: 30%;
        font-size: 16px;
        font-family: inherit;
        margin-bottom: 8px;
    }

    .bottomCont {
        display: flex;
        gap: 3px;
        margin-bottom: 10px;

        :nth-child(2) {
            margin-right: auto;
        }
    }

    // TODO: создать компонент "SquareButton"
    .button {
        width: 100%;
        max-width: 34px;
        aspect-ratio: 1 / 1;
        border-radius: 0px;
        border-width: 1px;
        padding: 0px;
        line-height: 0px;
        transition: all 0.2s ease-in-out;

        &:not([disabled]) {
            cursor: pointer;

            &:hover {
                background-color: beige;
            }
        }
    }
</style>

<script setup lang="ts">
    import { computed, reactive, ref } from 'vue';
    import { store } from './../../store.ts';

    const showModal = ref(false);

    /** Возвращает время в формате "мм:сс" */
    const getTimeString = (timeMs: number) => {
        const minutes = Math.floor(timeMs / (60 * 1000));
        const seconds = Math.round((timeMs - minutes * (60 * 1000)) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const questionIndex = ref(0);

    const isRecording = ref(false);

    store.answers = reactive(new Array<{questionID: number, text: string, audio: object}>(store.questions.length));
    for (let i = 0; i < store.questions.length; i++)
        store.answers[i] = reactive({ questionID: store.questions[i].id, text: "", audio: {} });

    const recordBtnClickHandler = () => {
        isRecording.value = !isRecording.value;
    };
</script>