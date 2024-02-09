<template>
    <!-- В данном случае не нужно делать `@click="$emit('click')"` -->
    <button class="btn" :disabled="disabled">
        <SVGIcon class="icon" :name="iconName" :color="color"
                 v-if="iconName.length > 0" :disabled="disabled" />
        <div class="slot" :style="iconName.length > 0 ? '' : 'display: block !important'">
            <slot />
        </div>
    </button>
</template>

<style lang="scss" scoped>
    .btn {
        padding: 0.222em 0.833em;
        border-radius: 0.555em;
        background-color: lightblue;
        transition: all 0.2s ease-in-out;
        font-size: 0.7em;

        &:not([disabled]) {
            cursor: pointer;

            &:hover {
                background-color: beige;
            }
        }
    }

    .icon {
        display: none;
        width: 1.4em;
    }

    @media only screen and (max-width: 615px) {
        .icon {
            display: block;
        }

        .slot {
            display: none;
        }
    }
</style>

<script setup lang="ts">
    //defineEmits(["click"]);
    const props = defineProps({
        iconName: {
            type: String,
            required: false,
            default() {
                return "";
            }
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
        disabled: Boolean
    });
</script>