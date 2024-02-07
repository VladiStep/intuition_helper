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

            <div class="recordTime">{{ recordTimeString }}</div>
            <Btn @click="nextBtnClickHandler" :disabled="nextBtnDisabled">Следующий вопрос</Btn>
        </div>
        
        <ModalWindow ref="modalWindow" v-model="showModal"
                     header="Сообщение" text="Начать запись с начала?" buttons="yesno"
                     @close="modalCloseHandler" />
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
        margin-bottom: 12px;
    }

    .bottomCont {
        display: flex;
        gap: 3px;
        align-items: center;

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

    .recordTime {
        font-size: 20px;
        margin-left: 4px;
    }
</style>

<script setup lang="ts">
    import { computed, reactive, ref, watch } from 'vue';
    import { store } from './../../store.ts';
    import ModalWindow from '../ModalWindow.vue';

    const modalWindow = ref<InstanceType<typeof ModalWindow>>();
    const showModal = ref(false);

    /** Возвращает время в формате "мм:сс" */
    const getTimeString = (timeMs: number) => {
        const minutes = Math.floor(timeMs / (60 * 1000));
        const seconds = Math.round((timeMs - minutes * (60 * 1000)) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    /** Сколько времени идёт запись голоса */
    const recordTime = ref(0);
    const recordTimeString = computed(() => getTimeString(recordTime.value));

    let recordStartTime = 0;

    let recTimeInterval: NodeJS.Timeout | null = null;

    const questionIndex = ref(0);

    /** Идёт ли в данный момент запись */
    const isRecording = ref(false);

    const nextBtnDisabled = ref(true);

    store.answers = reactive(new Array<{questionID: number, text: string, audio: object | null}>(store.questions.length));
    for (let i = 0; i < store.questions.length; i++)
        store.answers[i] = reactive({ questionID: store.questions[i].id, text: "", audio: null });

    watch([store.answers, questionIndex], () => {
        const ans = store.answers[questionIndex.value];
        nextBtnDisabled.value = ans.text.length === 0 && ans.audio === null;
    });

    const recordBtnClickHandler = async () => {
        if (isRecording.value) {
            if (recTimeInterval !== null) {
                clearInterval(recTimeInterval);
                recTimeInterval = null;
            }

            recordStartTime = 0;

            stopRecordingCore();

            isRecording.value = false;
        }
        else {
            if (recTimeInterval === null) {
                if (store.answers[questionIndex.value].audio !== null) {
                    showModal.value = true;
                    // -> "modalCloseHandler()"
                }
                else {
                    startRecording();
                }
            }
        }
    };

    const startRecording = () => {
        recordStartTime = Date.now();
        recordTime.value = 0;
        recTimeInterval = setInterval(recIntervalFunc, 1000);

        startRecordingCore();

        isRecording.value = true;
    }
    const modalCloseHandler = (modalResult: boolean | null) => {
        if (modalResult !== true)
            return;

        startRecording();
    };

    const recIntervalFunc = () => {
        recordTime.value = Date.now() - recordStartTime;
    };

    const nextBtnClickHandler = () => {
        if (questionIndex.value == store.questions.length - 1)
        {
            store.currentScene.value = "AnswersScene";
            return;
        }

        questionIndex.value++;
    };

    const startRecordingCore = () => {
        store.answers[questionIndex.value].audio = null;
    };

    const stopRecordingCore = () => {
        store.answers[questionIndex.value].audio = {};
    };
</script>