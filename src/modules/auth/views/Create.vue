<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth'
  import { WalletAccount } from '@/interface/wallet.type'
  import { message, type FormProps } from 'ant-design-vue'

  import { CHAIN } from '@/constants/chain'
  import { useCopy } from '@/utils/useCopy'
  import { FormInstance, Rule } from 'ant-design-vue/es/form'

  const walletCore = useWalletCore()
  const auth = useAuthV2()

  const isBlur = ref(true)
  const formCreate = reactive({
    accountName: '',
    enterpriseAddress: '',
    mnemonic: '',
    passPhrase: ''
  })
  const rules: Record<keyof typeof formCreate, Rule[]> = {
    accountName: [{ required: true, message: 'Please input your account name', trigger: 'blur' }],
    enterpriseAddress: [{ required: true, message: 'Please input your enterprise address', trigger: 'blur' }],
    mnemonic: [{ required: true, message: 'Please input your seed phrase', trigger: 'blur' }],
    passPhrase: [
      { required: true, message: 'Please input your password', trigger: 'blur' },
      { min: 12, message: 'Password must be at least 12 characters', trigger: 'blur' }
    ]
  }
  const formRef = ref<FormInstance | null>(null)
  const loading = ref(false)
  const router = useRouter()

  const handleFinish: FormProps['onFinish'] = values => {
    console.log(values, formCreate)
  }
  const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
    console.log(errors)
  }

  async function handleCreateAccount() {
    try {
      await new Promise(resolve =>
        formRef.value
          ?.validate()
          .then(resolve)
          .catch(() => {})
      )
      loading.value = true
      const rs = await walletCore.registerWallet({
        name: formCreate.accountName,
        mnemonic: formCreate.mnemonic,
        passPhrase: formCreate.passPhrase
      })
      if (rs) {
        message.success('Create account successfully')
        auth.setCurrentWallet(rs)
        router.push({ name: 'Home' })
      }
    } catch (error) {
      console.error(error)
      message.error('Something went wrong! Please try again later.')
    } finally {
      loading.value = false
    }
  }

  const getDisabledCreateBtn = computed(() => {
    return !formCreate.accountName || !formCreate.enterpriseAddress || !formCreate.mnemonic
  })

  onMounted(async () => {
    // generate wallet address
    formCreate.mnemonic = walletCore.generateMnemonic(160)
    formCreate.enterpriseAddress = walletCore.getEnterpriseAddressByMnemonic(formCreate.mnemonic).to_address().to_bech32()
    formCreate.accountName = formCreate.enterpriseAddress
  })
</script>

<template>
  <div class="h-full w-full p-4">
    <div class="flex h-full flex-col justify-between">
      <div class="">
        <div class="mb-6 flex w-full justify-between">
          <a-button type="ghost" class="" size="large" @click="router.go(-1)">
            <Icon icon="ic:outline-arrow-back" height="20" />
          </a-button>
        </div>
        <p class="text-title-1 font-700 mb-8 text-left leading-8">Create account</p>
        <a-form
          layout="vertical"
          ref="formRef"
          hideRequiredMark
          :model="formCreate"
          :rules="rules"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
          class="form-create"
        >
          <a-form-item label="Address" name="enterpriseAddress">
            <p class="text-body-2 font-400 mb-2 text-left">We have create a unique HYDRA address for you, which is similar to your telegram nickname.</p>
            <a-input v-model:value="formCreate.enterpriseAddress" placeholder="Wallet address" readonly>
              <template #prefix>
                <icon icon="ic:outline-account-balance-wallet" height="18" color="#4d4d4d" />
              </template>
              <template #suffix>
                <icon icon="ic:outline-copy-all" height="16" class="hover:cursor-pointer" @click="useCopy(formCreate.enterpriseAddress)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="mnemonic">
            <template #label>
              <div class="flex items-center justify-between">
                <span>Seed phrase</span>
                <icon icon="ic:outline-copy-all" height="20" class="ml-2 hover:cursor-pointer" @click="useCopy(formCreate.mnemonic)" />
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
          <a-form-item label="Password" name="passPhrase">
            <p class="text-body-2 font-400 mb-2 text-left">
              A strong password contains lower and upper case letters, numbers, special characters and is at least 12 characters long.
            </p>
            <a-input v-model:value="formCreate.passPhrase" placeholder="Password">
              <template #prefix>
                <icon icon="ic:outline-lock" height="18" color="#4d4d4d" />
              </template>
            </a-input>
          </a-form-item>
        </a-form>
      </div>
      <div class="w-full">
        <a-button
          type="primary"
          class="!rounded-4 !h-[56px] w-full"
          size="large"
          @click="handleCreateAccount()"
          :loading="loading"
          :disabled="getDisabledCreateBtn"
        >
          Create
        </a-button>
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

  .form-create {
    :deep(.ant-form-item-label > label) {
      font-size: 18px;
    }
  }
</style>
