<template>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path :d="currSVGPath" :fill="color" />
    </svg>
</template>

<style lang="scss" scoped>
    
</style>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: false,
            validator(value: string, props) {
                return CSS.supports('color', value);
            },
            default() {
                return "gray";
            }
        }
    });

    const currSVGPath = computed(() => svgPathDict.get(props.name));
    const svgPathDict = new Map<string, string>([
        ["cross", "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"],
        ["mic", "M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"],

    ]);
</script>