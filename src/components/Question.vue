<template>
    <div class="cont">
        <TextField class="textField" v-model="questionText" placeholder="Введите текст вопроса..."
                   @input="textInputHandler" />
        <div class="buttonsCont">
            <button class="button" @click="handleRandBtnClick">
                <SVGIcon name="random" color="blue" title="Заполнить случайным образом" />
            </button>
            <button class="button" @click="$emit('onRemoveClick')">
                <SVGIcon name="cross" color="red" title="Удалить вопрос" />
            </button>
            
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cont {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 2px;
        box-sizing: border-box;
    }

    .textField {
        flex-grow: 1;
        height: 100%;
        margin-right: 1%;
        font-size: 16px;
        font-family: inherit;
    }

    .buttonsCont {
        max-width: 34px;
        width: 8%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .button {
        width: 100%;
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
    const question = defineModel<{id: number, text: string}>("question");
    const questionText = defineModel<string>("questionText");
    const emit = defineEmits(["onRemoveClick", "onTextInput"]);

    const handleRandBtnClick = () => {

    };

    const textInputHandler = () => {
        if (question.value !== undefined
            && questionText.value !== undefined) {
            question.value.text = questionText.value;
        }

        emit('onTextInput');
    };
</script>