<template>
    <TextField v-model="text" />
    <SVGIcon class="icon" name="mic" :color="text" />
</template>

<style lang="scss" scoped>
    .icon {
        width: 32px;
        height: 32px;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue';

    const text = ref("");
</script>