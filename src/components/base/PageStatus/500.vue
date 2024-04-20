<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary" @click="$router.push({ name: 'Home' })">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
