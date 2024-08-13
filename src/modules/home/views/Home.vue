<script setup lang="ts">
  import { formatId } from '@/utils/format'
  import BaseSkeleton from '@/components/base/Skeleton.vue'
  import { useCopy } from '@/utils/useCopy'
  import { message } from 'ant-design-vue'

  const { currentWallet, setCurrentWalletAddress } = useAuthV2()
  const walletCore = useWalletCore()
  const isLoading = ref(false)

  const isShowQrCode = ref(false)

  const tokens = ref([
    {
      currency: 'MIN',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      currency: 'MIN1',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      currency: 'MIN2',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      currency: 'MIN3',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      currency: 'AMD',
      balance: '0.039',
      contractAddress: '0xF02ae5a0BE48e1f7Ec0BC8beA6045985a0D286F',
      currencyIcon: '$Fty'
    }
  ])

  const nfts = ref([
    {
      name: 'EarthNode #884',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      name: 'Pavia  -45   -145',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      name: 'Book.io - Gutenberg Bible Collection',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      name: 'The Ape Society',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      name: 'AMD',
      balance: '0.039',
      contractAddress: '0xF02ae5a0BE48e1f7Ec0BC8beA6045985a0D286F',
      currencyIcon: '$Fty'
    }
  ])

  async function init() {
    isLoading.value = true
    if (!currentWallet) {
      // handled by router
      return
    }
    const walletDetail = await walletCore.getWalletById(currentWallet.id)
    if (!walletDetail) {
      // handled by router
      message.error('Wallet not found')
      return
    }
    setCurrentWalletAddress({
      id: walletDetail.id,
      address: walletDetail.name
    })
    isLoading.value = false
  }

  onMounted(() => {
    init()
    console.log('INIT HOME')
  })
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-[#fff]" v-if="currentWallet">
    <div class="h-[56px] flex-shrink-0 bg-[#fff]">
      <div class="flex h-full items-center justify-between px-4" border="b b-solid b-gray-3">
        <img src="/images/wallet-logo.png" alt="logo" class="w-36px h-36px object-contain" />
        <div class="flex items-center">
          <!-- <div class="mr-2 flex rounded-full p-1 transition-all last:mr-0" hover="cursor-pointer bg-[#EBDEDC]">
            <icon icon="tabler:plug-connected" height="20" />
          </div> -->
          <div class="mr-2 flex rounded-full p-1 transition-all last:mr-0" hover="cursor-pointer bg-[#EBDEDC]" @click="isShowQrCode = true">
            <icon icon="ic:outline-qr-code" height="20" />
          </div>
          <div class="mr-2 flex rounded-full p-1 transition-all last:mr-0" hover="cursor-pointer bg-[#EBDEDC]" @click="$router.push({ name: 'Settings' })">
            <icon icon="ic:outline-settings" height="20" />
          </div>
        </div>
      </div>
      <div class="mt-4 px-4">
        <div class="text-body-1 font-500 flex items-center justify-center text-center">
          {{ formatId(currentWallet.name, 12, 12) }}
          <icon icon="tabler:copy" height="24" class="ml-2 hover:cursor-pointer" @click="useCopy(currentWallet.name)" />
        </div>
        <div class="mt-6">
          <div class="rounded-4 bg-white p-4" border="1 solid #c7bab8">
            <p class="text-body-2 font-500 mb-0">Total Balance</p>
            <div class="flex items-center justify-between">
              <base-skeleton type="text" :height="24" :loading="true" v-if="isLoading" class="w-30" />
              <p class="text-title-2 font-700 mb-0" v-else>₳ {{ currentWallet.balance.total.quantity }}</p>
              <icon icon="tabler:eye" height="20" />
            </div>
            <div class="mt-4 flex">
              <a-button type="default" class="!rounded-3 !bg-primary btn-shadow-primary border-primary !h-10 !w-full text-white">Send</a-button>
            </div>
          </div>
          <!-- <base-skeleton type="text" :height="16" :loading="true" /> -->
        </div>
        <div class="mt-6">
          <a-tabs>
            <a-tab-pane key="1" tab="Tokens">
              <div class="">
                <div
                  class="mb-3 flex w-full items-center justify-between rounded-2xl px-4 py-4 transition-all"
                  border="1 solid #c7bab8"
                  hover="cursor-pointer bg-[#c7bab8] bg-opacity-10"
                  v-for="(item, index) in tokens"
                  :key="item.currency"
                >
                  <div class="flex w-full items-center">
                    <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white" border="1 solid #c7bab8">
                      <img :src="`/images/token-min.png`" alt="icon" class="h-full w-full rounded-full object-contain" />
                    </div>
                    <div class="flex-grow-1 ml-4 flex items-center justify-between">
                      <span class="text-body-1 font-700">{{ item.currency }}</span>
                      <span class="text-body-1 font-500 text-primary">
                        {{ item.balance }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="NFTs">
              <div class="">
                <div
                  class="mb-3 flex w-full items-center justify-between rounded-2xl px-4 py-4 transition-all"
                  border="1 solid #c7bab8"
                  hover="cursor-pointer bg-[#c7bab8] bg-opacity-10"
                  v-for="(item, index) in nfts"
                  :key="index"
                >
                  <div class="flex w-full items-center">
                    <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white" border="1 solid #c7bab8">
                      <img :src="`/images/token-min.png`" alt="icon" class="h-full w-full rounded-full object-contain" />
                    </div>
                    <div class="flex-grow-1 ml-4 flex items-center justify-between">
                      <span class="text-body-1 font-700">{{ item.name }}</span>
                      <span class="text-body-1 font-500 text-primary">
                        {{ item.balance }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="History">
              <div class="">
                <div
                  class="mb-3 flex w-full items-center justify-between rounded-2xl px-4 py-4 transition-all"
                  border="1 solid #c7bab8"
                  hover="cursor-pointer bg-[#c7bab8] bg-opacity-10"
                  v-for="(item, index) in tokens"
                  :key="item.currency"
                >
                  <div class="flex w-full items-center">
                    <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white" border="1 solid #c7bab8">
                      <img :src="`/images/token-min.png`" alt="icon" class="h-full w-full rounded-full object-contain" />
                    </div>
                    <div class="flex-grow-1 ml-4 flex items-center justify-between">
                      <span class="text-body-1 font-700">{{ item.currency }}</span>
                      <span class="text-body-1 font-500 text-primary">
                        {{ item.balance }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <a-drawer v-model:open="isShowQrCode" class="rounded-t-3 !bg-[#fff]" root-class-name="root-class-name" placement="bottom" :closable="false" :height="300">
      <div class="flex justify-center">
        <!-- <div class="rounded-2 p-1" border="1 solid #c7bab8">
          <img src="/images/examples/qrcode.jpg" alt="" class="h-40 w-40 rounded object-contain" />
        </div> -->
        <a-qrcode error-level="H" :value="currentWallet.name" icon="/logo-100x100.svg" />
      </div>
      <div class="mt-8 flex items-center">
        <div class="flex-grow text-left">
          <span class="text-body-1 font-400 text-gray-6">HYDRA address</span>
          <div class="text-body-1 text-gray-8 mt-1">
            {{ formatId(currentWallet.name, 10, 7) }}
            <!-- <span>
              <icon icon="ic:outline-copy-all" height="18" class="ml-2 hover:cursor-pointer" @click="useCopyContent('0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96')" />
            </span> -->
          </div>
        </div>
        <div class="flex-shrink-0">
          <a-button
            type="default"
            class="!rounded-3 !bg-primary btn-shadow-primary border-primary flex !h-10 !w-full items-center text-white"
            @click="useCopy(currentWallet.name)"
          >
            <icon icon="tabler:copy" height="18" class="mr-1" /> Copy
          </a-button>
        </div>
      </div>
    </a-drawer>
  </div>
  <div class="" v-else>
    <base-skeleton type="text" :height="16" :loading="true" />
  </div>
</template>
