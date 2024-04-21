<script setup lang="ts">
  const authen = useAuth()
  const router = useRouter()

  function handleLogout() {
    router.push({ name: 'auth' })
  }
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-[#EBDEDC]">
    <div class="h-[56px] flex-shrink-0 bg-[#fcebe9] px-4">
      <div class="flex h-full w-full items-center justify-between">
        <a-button type="ghost" class="" size="large" @click="$router.go(-1)">
          <icon icon="ic:outline-arrow-back" height="20" />
        </a-button>
      </div>
    </div>
    <div class="flex-grow-1 p-4">
      <div class="flex h-full flex-col justify-between">
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
                <p class="text-body-1 font-700 mb-1 leading-4">{{ formatId('0x2F1Fe5a0BE48e1f7Ec0BC8beA6045985a0210C96', 8, 8) }}</p>
                <p class="text-body-3 font-400 mb-0">
                  {{ '0.39' }} <span class="font-500">{{ '$Fuel' }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <a-button type="default" danger class="!rounded-4 !h-[56px] w-full" size="large" @click="handleLogout()">
            <div class="flex items-center justify-center">
              <icon icon="ic:outline-logout" height="26" />
              <span class="ml-3">Logout</span>
            </div>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
