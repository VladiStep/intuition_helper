<template>
    <div class="sceneCont">
        <div class="status">Ответ {{ answerIndex + 1 }} из {{ store.answers.length }}</div>

        <TextField class="textField questionText" v-model="store.questions[answerIndex].text"
                   readonly />
        <TextField class="textField answerText" v-model="store.answers[answerIndex].text"
                   placeholder="Введите текст ответа..." />
        
        <div class="bottomCont">
            <div class="buttonsCont">
                <SquareBtn @click="playBtnClickHandler"
                           v-show="store.answers[answerIndex].audioURL !== null">
                    <SVGIcon :name="isPlaying ? 'pause' : 'play'" color="green" 
                            :title="`${ isPlaying ? 'Приостановить' : 'Начать' } воспроизведение записи`" />
                </SquareBtn>
                <SquareBtn @click="stopBtnClickHandler"
                           v-show="store.answers[answerIndex].audioURL !== null">
                    <SVGIcon name="stop" color="green"
                            title="Остановить воспроизведение записи`" />
                </SquareBtn>
            </div>

            <Btn iconName="back" @click="prevBtnClickHandler" v-if="answerIndex > 0">Назад</Btn>
            <Btn @click="nextBtnClickHandler"
                 :iconName="(answerIndex !== store.questions.length - 1) ? 'next' : 'return'">
                {{ answerIndex !== store.questions.length - 1 
                   ? 'Дальше' : 'Запустить с начала' }}
            </Btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .sceneCont {
        display: flex;
        flex-direction: column;
        max-width: 710px !important;
    }

    .status {
        color: black;
        margin-top: 0.231rem;
        margin-bottom: 0.769rem;
        font-size: 20px;
    }
    .textField {
        width: 100%;
        font-family: inherit;
        margin-bottom: 0.461rem;
        background-color: yellow;
    }
    .questionText {
        height: 20%;
        font-size: 18px;
    }
    .answerText {
        height: 30%;
        font-size: 16px;
    }
    
    .bottomCont {
        display: flex;
        gap: 0.115rem;
        align-items: center;
    }
    .buttonsCont {
        display: flex;
        gap: 0.115rem;
        margin-right: auto;
        height: 100%;
        width: 10%;
    }
</style>

<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import { useStore } from "./../../store";

    const store = useStore();
    const { revokeAudioURLs } = store;

    const answerIndex = ref(0);

    const isPlaying = ref(false);

    const prevBtnClickHandler = () => {
        if (answerIndex.value !== 0)
            answerIndex.value--;
    }
    const nextBtnClickHandler = () => {
        if (answerIndex.value === store.questions.length - 1)
        {
            if (isPlaying.value)
                stopBtnClickHandler();

            revokeAudioURLs();

            store.currentScene = "StartScene";
            return;
        }

        answerIndex.value++;
    };


    const audio = new Audio();
    watch([answerIndex], () => {
        if (isPlaying.value)
            stopBtnClickHandler();

        updateAudioSrc();
    });

    const updateAudioSrc = () => {
        const url = store.answers[answerIndex.value].audioURL;
        if (url !== null)
            audio.src = url;
    }

    const playBtnClickHandler = async () => {
        if (isPlaying.value) {
            audio.pause();
            isPlaying.value = false;
        }
        else {
            await audio.play();
            isPlaying.value = true;
        }
    };

    const stopBtnClickHandler = () => {
        audio.pause();
        audio.currentTime = 0;
        isPlaying.value = false;
    }

    audio.addEventListener("ended", stopBtnClickHandler);

    onMounted(updateAudioSrc);
</script>