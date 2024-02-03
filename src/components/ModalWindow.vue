<template>
    <Transition name="modal">
        <div class="modalMask" v-if="show">
            <div class="modalWrapper" @click="$emit('close')">
                <div class="modalContainer" @click.stop>
                    <div class="modalHeader">
                        {{ header }}
                    </div>

                    <div class="modalBody">
                        {{ text }}
                    </div>

                    <div class="modalFooter">
                        {{ footer }}
                        <Btn class="modalDefaultButton" @click="$emit('close')">OK</Btn>
                    </div>
                    
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
    .modalMask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modalWrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modalContainer {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: white;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.2s ease;
        font-family: Arial, Helvetica, sans-serif;
    }

    .modalHeader {
        margin-top: 0;
        font-size: 1.2em;
        color: #42b983;
    }

    .modalBody {
        margin: 20px 0;
        white-space: pre;
    }

    .modalFooter {
        display: flex;
        width: 100%;
        align-items: baseline;
    }

    .modalDefaultButton {
        margin-left: auto;
        font-size: 16px;
    }

    // "modal" - название Transition
    .modal-enter-from {
        opacity: 0;
    }

    .modal-leave-to {
        opacity: 0;
    }

    .modal-enter-from .modalContainer,
    .modal-leave-to .modalContainer {
        transform: scale(1.1);
    }
</style>

<script setup lang="ts">
    defineEmits(['close']);

    const props = defineProps({
        show: Boolean,
        header: {
            type: String,
            default() {
                return "Заголовок по умолчанию";
            }
        },
        text: {
            type: String,
            default() {
                return "Текст по умолчанию";
            }
        },
        footer: {
            type: String,
            default() {
                return "Нижний текст по умолчанию";
            }
        }
    });
</script>