<template>
  <a-modal
    v-model:open="isOpen"
    :width="width"
    :mask-closable="closeClickModal"
    :closable="closable"
    :top="top"
    class="base-popup"
    :class="[!showHeader && 'hidden-header']"
    :ok-text="okText"
    :cancel-text="cancelText"
    @ok="$emit('submit')"
    @cancel="$emit('cancel')"
  >
    <template v-if="showHeader" #title>
      <div class="text-sm font-semibold leading-[24px] uppercase md:text-[18px]">
        <slot name="title" />
      </div>
    </template>

    <div class="popup-content max-h-[70vh] overflow-x-auto" :class="contentClass">
      <slot />
    </div>
    <template v-if="showFooter" #footer>
      <div class="popup-footer">
        <slot name="footer" />
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import { findIndex } from 'lodash-es'
  import { useMainStore } from '@/stores/main'
  const mainStore = useMainStore()

  interface IPopup {
    name: string
    width?: string
    showFooter?: boolean
    showHeader?: boolean
    top?: string
    closeClickModal?: boolean
    contentClass?: string
    modalClass?: string
    closable?: boolean
    okText?: string
    cancelText?: string
  }
  const props = withDefaults(defineProps<IPopup>(), {
    name: '',
    width: '600px',
    top: '5vh',
    showFooter: false,
    showHeader: true,
    closeClickModal: true,
    contentClass: '',
    modalClass: '',
    closable: true,
    okText: 'OK',
    cancelText: 'Cancel'
  })

  const emits = defineEmits<{
    (e: 'close'): void
    (e: 'open'): void
    (e: 'submit'): void
    (e: 'cancel'): void
  }>()

  const isOpen = computed({
    // getter
    get() {
      return (
        findIndex(mainStore.popup, value => {
          return value === props.name
        }) !== -1
      )
    },
    // setter
    set(value: boolean) {
      mainStore.setPopupState(value, props.name)
    }
  })

  watch(isOpen, isOpen => {
    if (isOpen) {
      handleOpen()
    } else {
      handleClose()
    }
  })

  function handleOpen() {
    emits('open')
  }
  function handleClose() {
    emits('close')
  }
</script>

<style lang="scss">
  .base-popup {
    display: block;
    border-radius: 8px;
    .ant-modal-content {
      padding: 0;
      .ant-modal-header {
        padding: 16px;
        margin-bottom: 0;
        border-bottom: 1px solid #d3d3d3;
      }
      .ant-modal-body {
        @apply p-4;
      }
      .ant-modal-footer {
        @apply px-4 pb-4;
      }
    }
  }
</style>
