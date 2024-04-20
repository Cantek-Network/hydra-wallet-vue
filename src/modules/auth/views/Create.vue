<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth'
  import { useCopyContent } from '@/composables/useCopy'
  import type { FormProps } from 'ant-design-vue'

  const isBlur = ref(true)
  const formCreate = reactive({
    accountId: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
    seedPhrase: 'heart onion spin rail piece invite taxi tackle fetch love humor prefer'
  })
  const loading = ref(false)
  const authen = useAuth()
  const router = useRouter()

  const handleFinish: FormProps['onFinish'] = values => {
    console.log(values, formCreate)
  }
  const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
    console.log(errors)
  }

  function handleCreateAccount() {
    try {
      loading.value = true
      setTimeout(() => {
        console.log('Create account')
        loading.value = false
        authen.login(formCreate, 'access-token')
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }, 3000)
    } catch (error) {
      console.error(error)
    } finally {
      //   loading.value = false
    }
  }
</script>

<template>
  <div class="h-full w-full p-4">
    <div class="flex h-full flex-col justify-between">
      <div class="">
        <div class="mb-6 flex w-full justify-between">
          <a-button type="ghost" class="" size="large" @click="$router.go(-1)">
            <Icon icon="ic:outline-arrow-back" size="20" />
          </a-button>
        </div>
        <p class="text-title-1 font-700 mb-8 text-left leading-8">Create account</p>
        <a-form layout="vertical" :model="formCreate" @finish="handleFinish" @finishFailed="handleFinishFailed">
          <a-form-item label="Wallet address">
            <p class="text-body-3 font-400 mb-2 text-left">We have created a unique address for you!</p>
            <a-input v-model:value="formCreate.accountId" placeholder="Wallet address" readonly>
              <template #prefix>
                <icon icon="ic:outline-account-circle" size="18" color="#4d4d4d" />
              </template>
              <template #suffix>
                <icon icon="ic:outline-copy-all" size="16" class="hover:cursor-pointer" @click="useCopyContent(formCreate.accountId)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <template #label>
              <div class="flex items-center justify-between">
                <span>Seed phrase</span>
                <icon icon="ic:outline-copy-all" size="20" class="ml-2 hover:cursor-pointer" @click="useCopyContent(formCreate.seedPhrase)" />
              </div>
            </template>
            <p class="text-body-3 font-400 mb-2 text-left">Copy your seed phrase right now to avoid losing your account!</p>
            <div class="seedphrase" :class="[isBlur && 'seedphrase--blur']">
              <a-textarea
                v-model:value="formCreate.seedPhrase"
                readonly
                placeholder="Seed or private key"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                class="!rounded-4 font-600"
                @focus="isBlur = false"
                :class="[isBlur && 'cursor-pointer']"
              />
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="w-full">
        <a-button type="primary" class="!rounded-4 !h-[56px] w-full" size="large" @click="handleCreateAccount()" :loading="loading">Create</a-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .seedphrase {
    &.seedphrase--blur {
      cursor: pointer;
      filter: blur(3px);
      transition: filter 0.3s;
    }
  }
</style>
