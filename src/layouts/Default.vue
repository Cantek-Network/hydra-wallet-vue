<script setup lang="ts">
  import type { ConfigProviderProps } from 'ant-design-vue/es'
  import { theme as antdTheme } from 'ant-design-vue'
  import { assetTokens } from '@/constants/asset-tokens'
  import { initListToken } from '@/utils/format'

  const theme = reactive({
    algorithm: antdTheme.defaultAlgorithm
  })

  const { currentWallet } = useAuthV2()
  const router = useRouter()

  initListToken(assetTokens, assetTokens)

  onBeforeMount(() => {
    if (!currentWallet) {
      router.push({ name: 'Auth' })
    } else {
      // refresh wallet data
    }
  })
</script>

<template>
  <a-config-provider :theme="theme">
    <div class="mx-a h-full w-full max-w-3xl">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<style>
  html {
    --bg-color: #f1f1f1;
  }
  html.dark {
    --bg-color: rgb(42, 44, 44);
    --bg-header-color: rgb(36, 37, 37);
  }

  body {
    background-color: var(--bg-color);
  }
</style>
