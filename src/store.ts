import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
        currentScene: "StartScene" as "StartScene" | "QuestionsScene" | "AnswersScene",

        /** Список введённых вопросов */
        questions: new Array<{id: number, text: string}>(),
        questionRandomKeys: new Array<number>(),

        /** Список введённых ответов на вопросы */
        answers: new Array<{questionID: number, text: string, audioURL: string | null}>(),

        lastQuestionId: 0,
        minQuestionCount: 2,
        maxQuestionCount: 6
    }),
    getters: {
        anyQuestionIsEmpty(store) {
            return store.questions.some(q => q.text.length === 0);
        }
    },
    actions: {
        revokeAudioURLs() {
            this.answers.forEach(a => {
                if (a.audioURL !== null) {
                    window.URL.revokeObjectURL(a.audioURL);
                }
            });
        }
    }
});