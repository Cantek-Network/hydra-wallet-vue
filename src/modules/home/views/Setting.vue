<script setup lang="ts">
  import { formatId } from '@/utils/format'

  const { currentWallet, reset } = useAuthV2()
  const router = useRouter()

  function handleLogout() {
    reset()
    router.push({ name: 'Auth' })
  }

  onMounted(() => {
    console.log('currentWallet', currentWallet)
    if (!currentWallet) {
      router.push({ name: 'Auth' })
    }
  })
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-[#fff]">
    <div class="h-[56px] flex-shrink-0 bg-[#fff] px-4" border="b b-solid b-gray-3">
      <div class="flex h-full w-full items-center justify-between">
        <a-button type="ghost" class="" size="large" @click="$router.go(-1)">
          <icon icon="ic:outline-arrow-back" height="20" />
        </a-button>
      </div>
    </div>
    <div class="flex-grow-1 p-4" v-if="currentWallet">
      <div class="flex h-full flex-col justify-between">
        <div class="w-full">
          <div class="w-full">
            <div
              class="mb-3 flex w-full items-center justify-between rounded-2xl px-4 py-4 transition-all"
              border="1 solid #c7bab8"
              hover="cursor-pointer bg-[#c7bab8] bg-opacity-10"
            >
              <div class="flex items-center">
                <div class="rounded-2 flex h-9 w-9 items-center justify-center" border="1 solid #c7bab8">
                  <icon icon="ic:outline-account-circle" height="20" color="#4d4d4d" />
                </div>
                <div class="ml-3">
                  <p class="text-body-1 font-600 mb-1 leading-4">{{ formatId(currentWallet.name, 13, 7) }}</p>
                  <p class="text-body-3 font-400 mb-0">
                    {{ '0.00' }} <span class="font-500">{{ 'tADA' }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-4 mt-4" border="1 solid #c7bab8">
            <div
              class="flex w-full items-center justify-between px-4 py-4 transition-all"
              border="b b-solid #c7bab8"
              hover="cursor-pointer bg-[#c7bab8] bg-opacity-10 rounded-t-4"
            >
              <div class="flex items-center">
                <div class="rounded-2 flex h-9 w-9 items-center justify-center" border="1 solid #c7bab8">
                  <icon icon="carbon:document" height="20" color="#4d4d4d" />
                </div>
                <div class="ml-3">
                  <p class="text-body-1 font-600 mb-1 leading-4">Seed phrase</p>
                </div>
              </div>
              <div class="flex">
                <icon icon="ic:outline-arrow-forward" height="26" />
              </div>
            </div>
            <div
              class="flex w-full items-center justify-between px-4 py-4 transition-all"
              border="b b-solid #c7bab8"
              hover="cursor-pointer bg-[#c7bab8] bg-opacity-10"
            >
              <div class="flex items-center">
                <div class="rounded-2 flex h-9 w-9 items-center justify-center" border="1 solid #c7bab8">
                  <icon icon="carbon:link" height="20" color="#4d4d4d" />
                </div>
                <div class="ml-3">
                  <p class="text-body-1 font-600 mb-1 leading-4">Recover inviter</p>
                </div>
              </div>
              <div class="flex">
                <icon icon="ic:outline-arrow-forward" height="26" />
              </div>
            </div>
            <div
              class="flex w-full items-center justify-between px-4 py-4 transition-all"
              border="b b-solid #c7bab8"
              hover="cursor-pointer bg-[#c7bab8] bg-opacity-10"
            >
              <div class="flex items-center">
                <div class="rounded-2 flex h-9 w-9 items-center justify-center" border="1 solid #c7bab8">
                  <icon icon="carbon:book" height="20" color="#4d4d4d" />
                </div>
                <div class="ml-3">
                  <p class="text-body-1 font-600 mb-1 leading-4">Change RPC</p>
                </div>
              </div>
              <div class="flex">
                <icon icon="ic:outline-arrow-forward" height="26" />
              </div>
            </div>
            <div class="flex w-full items-center justify-between px-4 py-4 transition-all" hover="cursor-pointer bg-[#c7bab8] bg-opacity-10 rounded-b-4">
              <div class="flex items-center">
                <div class="rounded-2 flex h-9 w-9 items-center justify-center" border="1 solid #c7bab8">
                  <icon icon="carbon:rocket" height="20" color="#4d4d4d" />
                </div>
                <div class="ml-3">
                  <p class="text-body-1 font-600 mb-1 leading-4">Disable animations</p>
                </div>
              </div>
              <div class="flex">
                <icon icon="ic:outline-arrow-forward" height="26" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <a-button type="default" danger class="!rounded-4 mb-4 !h-[70px] w-full !border-[#c7bab8] !px-4" size="large" @click="handleLogout()">
            <div class="justify-left flex items-center">
              <div class="rounded-2 flex h-9 w-9 items-center justify-center" border="1 solid #c7bab8">
                <icon icon="ic:round-add-circle-outline" height="20" color="#4d4d4d" />
              </div>
              <span class="font-600 text-body-1 ml-3 text-[#4d4d4d]">Import account</span>
            </div>
          </a-button>
          <a-button type="default" danger class="!rounded-4 !h-[70px] w-full bg-[#FFE2E0] !px-4" size="large" @click="handleLogout()">
            <div class="justify-left flex items-center">
              <div class="rounded-2 flex h-9 w-9 items-center justify-center bg-white">
                <icon icon="ic:outline-logout" height="26" />
              </div>
              <span class="font-600 text-body-1 ml-3">Logout</span>
            </div>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
