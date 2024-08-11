import { message } from 'ant-design-vue'

export const useCopy = (content: string): void => {
  navigator.clipboard.writeText(content)
  message.success({ content: 'Copied!', key: 'copy', duration: 2 })
}
