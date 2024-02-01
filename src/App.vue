<template>
    <Btn @click="testClick">TestButton</Btn>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
const testClick = () => {
    alert("clicked");
};
</script>