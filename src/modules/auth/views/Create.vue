<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth'
  import { useCopyContent } from '@/composables/useCopy'
  import { WalletAccount } from '@/interface/wallet.type'
  import { message, type FormProps } from 'ant-design-vue'

  import { CHAIN } from '@/constants/chain'
  import useAuthStore from '../stores'

  const walletCore = useWalletCore()
  const authStore = useAuthStore()

  const isBlur = ref(true)
  const formCreate = reactive({
    accountName: '',
    enterpriseAddress: '',
    mnemonic: ''
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

        const wallet: WalletAccount = {
          id: formCreate.accountName,
          enterpriseAddress: formCreate.enterpriseAddress,
          networkId: CHAIN,
          rootKey: {
            prv: '',
            pub: '',
            v: '1'
          },
          signType: 'mnemonic'
        }
        authStore.registerWalletAccount(wallet)

        message.success('Account created successfully!')
      }, 0)
    } catch (error) {
      console.error(error)
    } finally {
      //   loading.value = false
    }
  }

  const getDisabledCreateBtn = computed(() => {
    return !formCreate.accountName || !formCreate.enterpriseAddress || !formCreate.mnemonic
  })

  onMounted(async () => {
    // generate wallet address
    formCreate.mnemonic = walletCore.generateMnemonic()
    formCreate.enterpriseAddress = walletCore.getEnterpriseAddressByMnemonic(formCreate.mnemonic).to_address().to_bech32()
  })
</script>

<template>
  <div class="h-full w-full p-4">
    <div class="flex h-full flex-col justify-between">
      <div class="">
        <div class="mb-6 flex w-full justify-between">
          <a-button type="ghost" class="" size="large" @click="$router.go(-1)">
            <Icon icon="ic:outline-arrow-back" height="20" />
          </a-button>
        </div>
        <p class="text-title-1 font-700 mb-8 text-left leading-8">Create account</p>
        <a-form layout="vertical" :model="formCreate" @finish="handleFinish" @finishFailed="handleFinishFailed">
          <a-form-item label="Account name">
            <a-input v-model:value="formCreate.accountName" placeholder="Your account name">
              <template #prefix>
                <icon icon="ic:outline-account-circle" height="18" color="#4d4d4d" />
              </template>
              <template #suffix>
                <icon icon="ic:outline-copy-all" height="16" class="hover:cursor-pointer" @click="useCopyContent(formCreate.accountName)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="Wallet address">
            <p class="text-body-3 font-400 mb-2 text-left">We have created a unique address for you!</p>
            <a-input v-model:value="formCreate.enterpriseAddress" placeholder="Wallet address" readonly>
              <template #prefix>
                <icon icon="ic:outline-account-balance-wallet" height="18" color="#4d4d4d" />
              </template>
              <template #suffix>
                <icon icon="ic:outline-copy-all" height="16" class="hover:cursor-pointer" @click="useCopyContent(formCreate.enterpriseAddress)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <template #label>
              <div class="flex items-center justify-between">
                <span>Seed phrase</span>
                <icon icon="ic:outline-copy-all" height="20" class="ml-2 hover:cursor-pointer" @click="useCopyContent(formCreate.mnemonic)" />
              </div>
            </template>
            <p class="text-body-3 font-400 mb-2 text-left">Copy your seed phrase right now to avoid losing your account!</p>
            <div class="seedphrase" :class="[isBlur && 'seedphrase--blur']">
              <a-textarea
                v-model:value="formCreate.mnemonic"
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
        <a-button type="primary" class="!rounded-4 !h-[56px] w-full" size="large" @click="handleCreateAccount()" :loading="loading" :disabled="getDisabledCreateBtn"
          >Create</a-button
        >
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
