<template>
    <!-- В данном случае не нужно делать `@click="$emit('click')"` -->
    <button class="squareBtn">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
    .squareBtn {
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
</style>

<script setup lang="ts">
    //defineEmits(["click"]);
</script>