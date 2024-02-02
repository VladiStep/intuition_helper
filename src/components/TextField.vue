<template>
    <textarea class="textarea" v-model="modelValue" />
</template>

<style lang="scss" scoped>
    .textarea {
        resize: none;
        border-radius: 10px;
        padding: 6px;
        width: 256px;
        height: 72px;

        // Отступ от правого края можно сделать только так, но тогда
        // не будет закругления у ползунка
        /*&::-webkit-scrollbar {
            width: 9px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #cfc6c3;
            background-clip: padding-box;
            border-right: 6px solid transparent;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
        }*/
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: #cfc6c3;
        }
        &::-webkit-scrollbar-track {
            margin: 6px;
        }
    }
</style>

<script setup lang="ts">
    import { TextareaHTMLAttributes } from 'vue';

    const modelValue = defineModel<TextareaHTMLAttributes['value']>();
</script>