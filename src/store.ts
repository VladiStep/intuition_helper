import { reactive, ref } from "vue";

export const store = {
    currentScene: ref<"StartScene" | "QuestionsScene" | "AnswersScene">("StartScene"),

    /** Список введённых вопросов */
    questions: reactive(new Array<{id: number, text: string}>()),
    
    lastQuestionId: 0,
    minQuestionCount: 2,
    maxQuestionCount: 6
}