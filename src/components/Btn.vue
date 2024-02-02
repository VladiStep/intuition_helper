<template>
    <!-- В данном случае не нужно делать `@click="$emit('click')"` -->
    <button class="button">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
    .button {
        padding: 4px 15px 4px 15px;
        border-radius: 10px;
        background-color: lightblue;
        transition: all 0.2s ease-in-out;
        font-size: 18px;

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