<template>
    <TextField @change="test" v-model="text" />
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { ref } from 'vue';

const test = () => {
    alert("change");
};
const text = ref("1234567890123456\n123\n123\n123\n123\n123");
</script>