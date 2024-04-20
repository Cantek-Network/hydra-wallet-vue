<script setup lang="ts">
  import type { CSSProperties } from 'vue'
  import type { ConfigProviderProps } from 'ant-design-vue/es'
  import { theme as antdTheme } from 'ant-design-vue'

  const theme = reactive({
    algorithm: antdTheme.defaultAlgorithm
  })

  const color = reactive({
    bg: '#fff',
    color: '#000'
  })

  const changeTheme = (type: 'dark' | 'light') => {
    if (type === 'dark') {
      theme.algorithm = antdTheme.darkAlgorithm
      color.bg = '#000'
      color.color = '#fff'
    } else {
      theme.algorithm = antdTheme.defaultAlgorithm
      color.bg = '#fff'
      color.color = '#000'
    }
  }
  const isDark = ref(false)
</script>

<template>
  <a-config-provider :theme="theme">
    <div class="mx-a h-screen w-full max-w-3xl">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
