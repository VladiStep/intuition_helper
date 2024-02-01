import { createApp } from "vue";
import Btn from './components/Btn.vue'

// Устанавливаем глобальные параметры
(global as any).__VUE_OPTIONS_API__ = false;
(global as any).__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === "development";

/** Главный div-контейнер */
const container = document.getElementById("appCont") as HTMLDivElement;

// Создаём vue-приложение
import App from "./App.vue";
const app = createApp(App);
app.component('Btn', Btn); // Сделать "Btn" доступным везде
app.mount(container);
