<template>
    <div class="cont">
        <TextField class="textField" v-model="questionText" />
        <div class="buttonsCont">
            <SVGIcon class="button" name="random" color="blue" title="Заполнить случайным образом"
                     @click="" />
            <SVGIcon class="button" name="cross" color="red" title="Удалить вопрос"
                     @click="" />
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
        margin-right: 2%;
        font-size: 16px;
        font-family: inherit;
    }

    .buttonsCont {
        max-width: 32px;
        width: 8%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .button {
        width: 100%;
        aspect-ratio: 1 / 1;
        border: solid black 1px;
        box-sizing: border-box;
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
    import { ref } from 'vue';
    
    const questionText = defineModel<string>("questionText");

    const fillRandomly = () => {

    };
</script>