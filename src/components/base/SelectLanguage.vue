<template>
  <a-select v-model:value="locale" style="width: 120px" :options="localeOptions" @change="handleChangeLocale">
    <template #suffixIcon>
      <img :src="suffixIcon" alt="icon-flag" height="14" class="" />
    </template>
  </a-select>
</template>

<script lang="ts" setup>
  import { SelectProps } from 'ant-design-vue'
  import { SelectValue } from 'ant-design-vue/es/select'
  import Cookies from 'js-cookies'
  import { useI18n } from 'vue-i18n'
  const { locale, t } = useI18n()
  const localeOptions = computed<SelectProps['options']>(() => [
    {
      value: 'en',
      label: t('English'),
      icon: 'https://flagicons.lipis.dev/flags/4x3/gb.svg'
    },
    {
      value: 'vi',
      label: t('Vietnamese'),
      icon: 'https://flagicons.lipis.dev/flags/4x3/vn.svg'
    }
  ])
  const suffixIcon = computed(() => localeOptions.value?.filter(el => el.value == locale.value)[0]?.icon)
  function handleChangeLocale(value: SelectValue) {
    Cookies.setItem('lang', value)
    // location.reload()
  }
</script>

<style lang="scss" scoped></style>
