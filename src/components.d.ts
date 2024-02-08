import Btn from './components/Btn.vue';
import SquareBtn from './components/SquareBtn.vue';
import TextField from './components/TextField.vue';
import SVGIcon from './components/SVGIcon.vue';
import Question from './components/Question.vue';
import ModalWindow from './components/ModalWindow.vue';

import StartScene from './components/scenes/StartScene.vue';
import QuestionsScene from './components/scenes/QuestionsScene.vue';
import AnswersScene from './components/scenes/AnswersScene.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Btn: typeof Btn,
    SquareBtn: typeof SquareBtn,
    TextField: typeof TextField,
    SVGIcon: typeof SVGIcon,
    Question: typeof Question,
    ModalWindow: typeof ModalWindow,

    StartScene: typeof StartScene,
    QuestionsScene: typeof QuestionsScene,
    AnswersScene: typeof AnswersScene
  }
}