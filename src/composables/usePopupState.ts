import { useMainStore } from '@/stores/main'

export const usePopupState = (popupName: string, state: 'open' | 'close') => {
    const mainStore = useMainStore()
    mainStore.setPopupState(state === 'open', popupName)
}
