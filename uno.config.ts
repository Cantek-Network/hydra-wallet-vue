import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
    {
      container: 'w-full mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1170px] 2xl:max-w-[1320px]'
    },
    ['text-title-1', 'font-600 text-[33px] leading-[56px]'],
    ['text-title-2', 'font-600 text-[24px] leading-[40px]'],
    ['text-title-3', 'font-700 text-[20px] leading-[40px]'],
    ['text-title-4', 'font-600 text-[16px] leading-[24px]'],
    ['text-title-5', 'font-600 text-[14px] leading-[24px]'],
    ['text-title-6', 'font-500 text-[14px] leading-[24px]'],
    ['text-body-1', 'font-500 text-[16px] leading-[24px]'],
    ['text-body-2', 'font-400 text-[14px] leading-[24px]'],
    ['text-body-3', 'font-500 text-[12px] leading-[16px]'],
    ['text-caption', 'font-400 text-[12px] leading-[16px]'],
    // Buttons
    ['btn-primary', 'bg-primary text-white font-600 px-6 py-3 rounded-lg'],
    ['btn-secondary', 'bg-secondary text-white font-600 px-6 py-3 rounded-lg'],
    ['btn-tertiary', 'bg-transparent text-secondary font-600 px-6 py-3 rounded-lg']
  ],
  theme: {
    colors: {
      primary: '#16BD4F',
      secondary: '#292D32'
    }
  },
  presets: [
    presetUno(), // Mặc định (@unocss/preset-wind).
    presetAttributify(), // CSS trên DOM như 1 Attribute(@unocss/preset-attributify)
    presetIcons({
      scale: 1.2,
      warn: true
    }), // Sử dụng bất kỳ icon nào làm class or attribute.(@unocss/preset-icons)
    presetWebFonts({
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700']
      }
    }) // sử dụng bất kì Font mà thư viện có sẵn hoặc có thể tự custome font (@unocss/preset-web-fonts)
  ],
  transformers: [
    transformerDirectives(), // @apply, @screen and theme() directive (@unocss/transformer-directives)
    transformerVariantGroup() // nhóm CSS lại với nhau => hover:(bg-gray-400 font-medium) (@unocss/transformer-variant-group)
  ]
})
