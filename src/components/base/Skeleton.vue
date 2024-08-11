<script lang="ts" setup>
  withDefaults(
    defineProps<{
      type?: 'text' | 'image'
      textLines?: number
      height?: number
      loading?: boolean
      imgClass?: string
    }>(),
    {
      type: 'text',
      textLines: 1,
      height: 16,
      loading: true,
      imgClass: ''
    }
  )
</script>

<template>
  <div class="base-skeleton">
    <div v-if="type === 'text'" class="skeleton-text">
      <div v-for="line in textLines" :key="line" class="skeleton-text-line mb-1 last:mb-0" :style="{ height: `${height}px` }" :class="[loading && 'loading']" />
    </div>
    <div v-else-if="type === 'image'" class="skeleton-image" :style="{ height: `${height}px` }" :class="[loading && 'loading', imgClass]" />
  </div>
</template>

<style lang="scss" scoped>
  .base-skeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .skeleton-text {
    width: 100%;
  }

  .skeleton-text-line {
    height: 10px;
    background-color: #fff; /* Color for text skeleton */

    border-radius: 4px;
  }

  .skeleton-image {
    width: 100%; /* Set width of the image skeleton */
    height: 100%; /* Set height of the image skeleton */
    background-color: #fff; /* Color for image skeleton */
    border-radius: inherit;
  }

  .loading {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, transparent 0%, #fff 50%, transparent 100%);
      animation: slide 2s linear infinite;
    }
  }
  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
