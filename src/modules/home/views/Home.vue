<script setup lang="ts">
  const auth = useAuth()

  const isShowQrCode = ref(false)

  const tokens = ref([
    {
      currency: '$Fuel',
      balance: '0.003',
      contractAddress: '0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96',
      currencyIcon: '$Fuel'
    },
    {
      currency: '$Fuelity',
      balance: '0.039',
      contractAddress: '0xF02ae5a0BE48e1f7Ec0BC8beA6045985a0D286F',
      currencyIcon: '$Fty'
    }
  ])
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-[#EBDEDC]" v-if="auth.walletAccount">
    <div class="h-[56px] flex-shrink-0 bg-[#fcebe9] px-4">
      <div class="flex h-full items-center justify-between">
        <img src="/images/wallet-logo.png" alt="logo" class="w-36px h-36px object-contain" />
        <div class="flex items-center">
          <div class="mr-2 flex rounded-full p-1 transition-all last:mr-0" hover="cursor-pointer bg-[#EBDEDC]" @click="isShowQrCode = true">
            <icon icon="ic:outline-qr-code" height="20" />
          </div>
          <div class="mr-2 flex rounded-full p-1 transition-all last:mr-0" hover="cursor-pointer bg-[#EBDEDC]" @click="$router.push({ name: 'Settings' })">
            <icon icon="ic:outline-settings" height="20" />
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="text-body-3 font-700 mt-2 flex items-center justify-center text-center">
          {{ formatId('0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96', 12, 12) }}
          <span>
            <icon icon="ic:outline-copy-all" height="18" class="ml-2 hover:cursor-pointer" @click="useCopyContent('0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96')" />
          </span>
        </div>
        <div class="mt-6">
          <div class="rounded-4 bg-white p-4" border="1 solid #c7bab8">
            <p class="text-body-2 font-500 mb-0">Total Balance</p>
            <p class="text-title-2 font-700 mb-0">$920.3</p>
            <div class="flex justify-end">
              <a-button type="default" class="!rounded-3">Transfer</a-button>
            </div>
          </div>
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
                  <div class="flex items-center">
                    <div class="rounded-2 flex h-9 w-9 items-center justify-center bg-white" border="1 solid #c7bab8">
                      <span class="text-#EBDEDC text-[11px]">{{ item.currencyIcon }}</span>
                    </div>
                    <div class="ml-3">
                      <p class="text-body-1 font-700 mb-1 leading-4">{{ item.currency }}</p>
                      <p class="text-body-3 font-400 mb-0">
                        {{ item.balance }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <a-drawer v-model:open="isShowQrCode" class="rounded-t-3 !bg-[#EBDEDC]" root-class-name="root-class-name" placement="bottom" :closable="false" :height="300">
      <div class="flex justify-center">
        <div class="rounded-2 p-1" border="1 solid #c7bab8">
          <img src="/images/examples/qrcode.jpg" alt="" class="h-40 w-40 rounded object-contain" />
        </div>
      </div>
      <div class="mt-5 flex justify-center">
        <div class="text-center">
          <p class="text-body-1 mb-1">Wallet address</p>
          <div class="text-body-3 font-700 flex items-center justify-center text-center">
            {{ formatId('0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96', 24, 24) }}
            <span>
              <icon icon="ic:outline-copy-all" height="18" class="ml-2 hover:cursor-pointer" @click="useCopyContent('0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96')" />
            </span>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
