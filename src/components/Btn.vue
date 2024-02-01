<template>
    <button class="button" @click="$emit('click')">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.button {
    padding: 4px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 10px;
    background-color: lightblue;
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
    defineEmits(["click"]);
</script>