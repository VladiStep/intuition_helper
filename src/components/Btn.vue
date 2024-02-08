<template>
    <!-- В данном случае не нужно делать `@click="$emit('click')"` -->
    <button class="btn">
        <SVGIcon class="icon" :name="iconName" :color="color" />
        <div class="slot">
            <slot />
        </div>
    </button>
</template>

<style lang="scss" scoped>
    .btn {
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

    .icon {
        display: none;
        width: 22px;
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
</script>