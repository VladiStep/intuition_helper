<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" :opacity="opacity">
        <title>{{ title }}</title>
        <path :d="currSVGPath" :fill="color" />
    </svg>
</template>

<style lang="scss" scoped>
    svg {
        transition: all 0.2s ease-in-out;
    }
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
        },
        disabled: Boolean,
        title: String
    });

    const opacity = computed(() => props.disabled ? 0.5 : 1);

    const currSVGPath = computed(() => svgPathDict.get(props.name));
    const svgPathDict = new Map<string, string>([
        ["cross", "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"],
        ["mic", "M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"],
        ["random", "M300-240q25 0 42.5-17.5T360-300q0-25-17.5-42.5T300-360q-25 0-42.5 17.5T240-300q0 25 17.5 42.5T300-240Zm0-360q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600Zm180 180q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm180 180q25 0 42.5-17.5T720-300q0-25-17.5-42.5T660-360q-25 0-42.5 17.5T600-300q0 25 17.5 42.5T660-240Zm0-360q25 0 42.5-17.5T720-660q0-25-17.5-42.5T660-720q-25 0-42.5 17.5T600-660q0 25 17.5 42.5T660-600ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"],
        
    ]);
</script>