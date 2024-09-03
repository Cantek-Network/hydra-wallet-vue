<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth'
  import getRepository, { RepoName } from '@/repositories'
  import { WalletRepository } from '@/repositories/wallet'
  import { message } from 'ant-design-vue'

  const steps = ['SEED_PHRASE', 'SELECT_ACCOUNT']
  const step = ref<'SEED_PHRASE' | 'SELECT_ACCOUNT'>('SEED_PHRASE')

  const walletApi = getRepository(RepoName.Wallet) as WalletRepository

  const form = reactive({
    mnemonic: 'daughter silk uncover cheese split ribbon treat forum belt planet divert verify easily fabric shrimp',
    passPhrase: 'hydrag'
  })

  const { currentWallet } = useAuthV2()

  const loading = ref(false)
  const authen = useAuth()
  const router = useRouter()

  function handleLogin() {
    try {
      loading.value = true
      setTimeout(() => {
        console.log('Create account')
        loading.value = false
        //
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

  function importAccount() {
    console.log('Import account')
  }

  function handleImportByMnemonic() {
    // validate mnemonic
    if (form.mnemonic) {
      try {
        const walletAddress = useWalletCore().getEnterpriseAddressByMnemonic(form.mnemonic).to_address().to_bech32()
        console.log('>>> / file: Import.vue:38 / walletAddress:', walletAddress)
        // const rootkey = useWalletCore().getCip1852Account(form.mnemonic).to_bech32()
        // const prvKey = useWalletCore().getPrivateKeyByMnemonic(form.mnemonic)
        // const pubKey = useWalletCore().getCip1852Account(form.mnemonic).to_public().to_bech32()
        if (!form.passPhrase) {
          message.error('Password is required', 2)
          return
        }
        walletApi
          .restoreWallet({
            name: '',
            mnemonic_sentence: form.mnemonic.split(' '),
            passphrase: form.passPhrase
          })
          .then(rs => {
            console.log('>>> / file: Import.vue:67 / rs:', rs)
          })
          .catch(err => {
            console.log('>>> / file: Import.vue:69 / err:', err)
          })
      } catch (error: any) {
        console.log(error.message)
        if (error.message === 'Invalid mnemonic') {
          message.error('Invalid Seed Phrase', 2)
        }
      }
    }
  }
</script>

<template>
  <div class="h-full w-full p-4">
    <div class="flex flex-col" v-if="step === 'SEED_PHRASE'">
      <div class="mb-6 flex w-full justify-between">
        <a-button type="ghost" class="" size="large" @click="$router.go(-1)">
          <icon icon="ic:outline-arrow-back" height="20" />
        </a-button>
      </div>
      <div class="mb-2">
        <p class="text-title-1 font-700 mb-2 text-left leading-8">Recover using Seed Phrase</p>
        <p class="text-body-1 font-700 text-left">Enter the backup passphrase associated with the account.</p>
      </div>
      <div class="">
        <a-form :model="form" layout="vertical">
          <a-textarea v-model:value="form.mnemonic" placeholder="Seed phrase" :auto-size="{ minRows: 4, maxRows: 6 }" class="!rounded-4" />
          <a-form-item label="Password" name="passPhrase" class="mt-4">
            <a-input-password v-model:value="form.passPhrase" placeholder="Password" type="password">
              <template #prefix>
                <icon icon="ic:outline-lock" height="18" color="#4d4d4d" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-form>
        <a-button type="primary" class="!rounded-4 btn-secondary mt-4 !h-[56px] w-full" size="large" :disabled="!form.mnemonic" @click="handleImportByMnemonic">
          Continue
        </a-button>
      </div>
    </div>
    <!-- <div class="flex h-full w-full flex-col" v-if="step === 'SELECT_ACCOUNT'">
      <div class="mb-6 flex w-full justify-between">
        <a-button type="ghost" class="" size="large" @click="$router.go(-1)">
          <icon icon="ic:outline-arrow-back" height="20" />
        </a-button>
      </div>
      <div class="mb-2">
        <p class="text-title-1 font-700 mb-2 text-left leading-8">Select account to log in</p>
        <p class="text-body-1 font-500 text-left">You have few activated account for this credentials.</p>
      </div>
      <div class="flex flex-col">
        <div
          class="mb-3 flex w-full items-center justify-between rounded-2xl px-4 py-4 transition-all"
          border="1 solid #c7bab8"
          hover="cursor-pointer bg-[#c7bab8] bg-opacity-10"
          v-for="(account, index) in accounts"
          :key="index"
          @click="selectedAccount = account"
        >
          <div class="flex items-center">
            <div class="rounded-2 flex h-9 w-9 items-center justify-center" border="1 solid #c7bab8">
              <icon icon="ic:outline-account-circle" height="20" color="#4d4d4d" />
            </div>
            <div class="ml-3">
              <p class="text-body-1 font-700 mb-1 leading-4">{{ formatId(account.accountId, 8, 8) }}</p>
              <p class="text-body-3 font-400 mb-0">
                {{ account.balance }} <span class="font-500">{{ account.currency }}</span>
              </p>
            </div>
          </div>
          <div class="" v-show="selectedAccount.accountId === account.accountId">
            <icon icon="ic:outline-check" height="28" color="#4d4d4d" />
          </div>
        </div>
      </div>
      <div class="w-full">
        <a-button type="primary" class="!rounded-4 !h-[56px] w-full" size="large" @click="handleLogin()" :loading="loading">Select account</a-button>
        <a-button type="default" class="!rounded-4 !h-[56px] w-full" size="large" @click="importAccount()">Import</a-button>
      </div>
    </div> -->
  </div>
</template>
