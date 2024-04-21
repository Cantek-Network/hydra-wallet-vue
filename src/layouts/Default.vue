<script setup lang="ts">
  import type { ConfigProviderProps } from 'ant-design-vue/es'
  import { theme as antdTheme } from 'ant-design-vue'

  const theme = reactive({
    algorithm: antdTheme.defaultAlgorithm
  })
</script>

<template>
  <a-config-provider :theme="theme">
    <div class="mx-a h-screen w-full max-w-3xl">
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
