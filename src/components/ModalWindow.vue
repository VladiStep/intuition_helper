<template>
    <Teleport to="body">
        <Transition name="modal">
            <div class="modalMask" v-if="showModal">
                <div class="modalWrapper" @click="closeHandler()">
                    <div class="modalContainer" @click.stop>
                        <div class="modalHeader">
                            {{ header }}
                        </div>

                        <div class="modalBody">
                            {{ text }}
                        </div>

                        <div class="modalFooter">
                            {{ footer }}
                            <div class="modalButtonsCont">
                                <div v-if="buttons === 'yesno'" class="modalYesNoButtons">
                                    <Btn @click="yesClickHandler">Да</Btn>
                                    <Btn @click="noClickHandler">Нет</Btn>
                                </div>
                                <Btn v-else class="modalOKButton" @click="closeHandler">OK</Btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
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
        width: fit-content;
        min-width: 16.666em;
        margin: 0px auto;
        padding: 1.111em 1.666em;
        background-color: white;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.2s ease;
        font-family: Arial, Helvetica, sans-serif;
        font-size: min(0.8rem, 18px);
    }

    .modalHeader {
        margin-top: 0;
        font-size: 1.2em;
        color: #42b983;
    }

    .modalBody {
        margin: 1.111em 0;
        white-space: pre;
        text-wrap: wrap;
        max-width: 20em;
    }

    .modalFooter {
        display: flex;
        width: 100%;
        align-items: baseline;
        text-wrap: nowrap;
    }

    .modalButtonsCont {
        font-size: 1.2em;
        margin-left: auto;
    }
    .modalYesNoButtons {
        padding-left: 16px;
        display: flex;
        gap: 3px;
    }
    .modalOKButton {
        //padding-left: 16px;
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
    import { PropType } from 'vue';

    const emit = defineEmits<{
        close: [modalResult: boolean | null]
    }>();

    const showModal = defineModel<boolean>();

    const closeHandler = (modalResult: boolean | null = null) => {
        showModal.value = false;
        emit("close", modalResult);
    };

    const yesClickHandler = () => {
        closeHandler(true);
    };
    const noClickHandler = () => {
        closeHandler(false);
    };

    const props = defineProps({
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
                return "";
            }
        },
        buttons: {
            type: String as PropType<"ok" | "yesno">,
            default() {
                return "ok";
            }
        }
    });
</script>