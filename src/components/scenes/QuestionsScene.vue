<template>
    <div class="sceneCont">
        <div class="status">Вопрос {{ questionIndex + 1 }} из {{ store.questions.length }}</div>
        <div class="hint">
            Ваша интуиция уже знает какой вопрос задан. Прислушайтесь к своим мыслям и ощущениям.
            Запишите всё в текстовое поле или сразу диктуйте в микрофон.
        </div>

        <TextField class="textField" v-model="store.answers[questionKeyIndex].text"
                   placeholder="Введите текст ответа..." />
        
        <div class="bottomCont">
            <SquareBtn id="micBtn" @click="recordBtnClickHandler">
                <SVGIcon name="mic" :color="`${ isRecording ? 'orangered' : 'gray' }`"
                         :title="`${ isRecording ? 'Остановить' : 'Начать' } запись голоса`" />
            </SquareBtn>

            <div class="recordTime">{{ recordTimeString }}</div>
            <Btn id="nextBtn" @click="nextBtnClickHandler" :disabled="nextBtnDisabled"
                 :iconName="(questionIndex !== store.questions.length - 1 ) ? 'next' : 'done'">
                {{ questionIndex !== store.questions.length - 1 
                   ? 'Следующий вопрос' : 'Завершить' }}
            </Btn>
        </div>
        
        <ModalWindow ref="modalWindow" v-model="showModal" :buttons="modalButtons" @close="modalCloseHandler"
                     :header="(modalButtons === 'yesno') ? 'Сообщение' : 'Ошибка'"
                     :text="(modalButtons == 'yesno') ? 'Начать запись с начала?'
                                                      : `При попытке начать запись возникла ошибка:\n${errText}`" />
    </div>
</template>

<style lang="scss" scoped>
    .sceneCont {
        display: flex;
        flex-direction: column;
        max-width: 730px !important;
    }

    .status {
        color: black;
        margin-top: 0.23rem;
        margin-bottom: 0.769rem;
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
        gap: 0.115rem;
        align-items: center;

        :nth-child(2) {
            margin-right: auto;
        }
    }

    #micBtn {
        width: 28px;
    }

    .recordTime {
        font-size: 20px;
        margin-left: 4px;
    }
</style>

<script setup lang="ts">
    import { computed, ref, watch } from "vue";
    import { useStore } from "./../../store";
    import ModalWindow from '../ModalWindow.vue';

    const store = useStore();

    const modalWindow = ref<InstanceType<typeof ModalWindow>>();
    const showModal = ref(false);
    const modalButtons = ref<"ok" | "yesno">("yesno");
    const errText = ref("");

    /** Возвращает время в формате "мм:сс" */
    const getTimeString = (timeMs: number) => {
        const minutes = Math.floor(timeMs / (60 * 1000));
        const seconds = Math.round((timeMs - minutes * (60 * 1000)) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const showError = (text: string) => {
        modalButtons.value = "ok";
        errText.value = text;
        showModal.value = true;
    }

    /** Сколько времени идёт запись голоса, в миллисекундах */
    const recordTime = ref(0);
    const recordTimeString = computed(() => getTimeString(recordTime.value));

    let recordStartTime = 0;

    let recTimeInterval: number | null = null;

    /** Отображаемый номер вопроса */
    const questionIndex = ref(0);

    /** Номер вопроса из случайного массива.<br>
     *  [0, 1, 2, 3] - store.questions.keys() <br>
     *  -↓<br>
     *  [1, 0, 3, 2] - questionRandomKeys
    */
    const questionKeyIndex = computed(() => store.questionRandomKeys[questionIndex.value]);

    /** Идёт ли в данный момент запись */
    const isRecording = ref(false);

    const nextBtnDisabled = ref(true);

    store.answers = new Array<{questionID: number, text: string, audioURL: string | null}>(store.questions.length);
    for (let i = 0; i < store.questions.length; i++)
        store.answers[i] = { questionID: store.questions[i].id, text: "", audioURL: null };

    watch([store.answers, questionIndex], () => {
        const ans = store.answers[questionKeyIndex.value];
        nextBtnDisabled.value = ans.text.length === 0 && ans.audioURL === null;
    });
    
    const recordBtnClickHandler = async () => {
        if (isRecording.value) {
            if (recTimeInterval !== null) {
                clearInterval(recTimeInterval);
                recTimeInterval = null;
            }

            recordStartTime = 0;

            await stopRecordingCore();

            isRecording.value = false;
        }
        else {
            if (recTimeInterval === null) {
                if (store.answers[questionKeyIndex.value].audioURL !== null) {
                    modalButtons.value = "yesno";
                    errText.value = "";
                    showModal.value = true;
                    // -> "modalCloseHandler()"
                }
                else {
                    await startRecording();
                }
            }
        }
    };

    const startRecording = async () => {
        if (!(await startRecordingCore()))
            return;

        recordStartTime = Date.now();
        recordTime.value = 0;
        recTimeInterval = setInterval(recIntervalFunc, 1000);

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

    const nextBtnClickHandler = async () => {
        if (isRecording.value) 
            await recordBtnClickHandler();

        if (questionIndex.value === store.questions.length - 1)
        {
            store.currentScene = "AnswersScene";
            return;
        }

        questionIndex.value++;
        recordStartTime = 0;
        recordTime.value = 0;
    };


    let stream: MediaStream;
    let recorder: MediaRecorder;
    let chunks: BlobPart[];

    const startRecordingCore = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    autoGainControl: false, 
                    echoCancellation: false, 
                    noiseSuppression: false
                }
            });
        }
        catch (err) {
            let str = String(err);
            const strLower = str.toLowerCase();
            if (strLower.includes(("permission")))
                str = "Отказано в разрешении.";
            else if (strLower.includes("notfounderror"))
                str = "Не найдено аудиоустройство."
            showError(str);

            return false;
        }

        recorder = new MediaRecorder(stream);
        chunks = [];
        recorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };
        recorder.start();

        const url = store.answers[questionKeyIndex.value].audioURL;
        if (url !== null)
            window.URL.revokeObjectURL(url);
        
        store.answers[questionKeyIndex.value].audioURL = null;
        
        return true;
    };

    const stopRecordingCore = async () => {
        stream.getTracks().forEach(track => track.stop());

        const stopPromise = new Promise<void>(resolve => {
            recorder.onstop = (e) => {
                if (recordTime.value < 1000)
                {
                    resolve();
                    return;
                }

                const blob = new Blob(chunks, { type: recorder.mimeType });
                chunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                store.answers[questionKeyIndex.value].audioURL = audioURL;

                // Чтобы можно было скачать запись
                console.log(`Аудиозапись ответа на вопрос ${questionKeyIndex.value + 1} - ${audioURL} (копировать вместе с "blob:")`);

                resolve();
            };
        });

        recorder.stop();
        await stopPromise;
    };
</script>