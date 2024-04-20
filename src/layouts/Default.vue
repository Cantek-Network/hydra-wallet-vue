<template>
  <a-layout>
    <a-layout-sider :collapsed="state.collapsed" collapsible :trigger="null" :collapsed-width="80" width="270px" class="main-sider h-screen" theme="light">
      <main-sidebar class="border-r border-[#d9d9d9] border-r-solid" />
    </a-layout-sider>
    <a-layout class="h-screen">
      <a-layout-header :style="headerStyle">
        <main-header :sider-collapsed="state.collapsed" @toggle-collapsed="toggleCollapsed" />
      </a-layout-header>
      <a-layout-content :style="contentStyle" class="scroll-bar-primary">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
      <!-- <a-layout-footer :style="footerStyle">Footer</a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue'
  import Cookies from 'js-cookies'
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    height: '48px',
    paddingInline: '16px',
    lineHeight: '48px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #d9d9d9'
  }

  const contentStyle: CSSProperties = {
    height: 'calc(100vh - 48px)',
    overflowY: 'auto',
    backgroundColor: '#fff'
  }
  const state = reactive({
    collapsed: false
  })

  const toggleCollapsed = () => {
    state.collapsed = !state.collapsed
  }

  onMounted(() => {
    const lang = Cookies.getItem('lang') || 'en'
    locale.value = lang
  })
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
