<script lang="ts" setup>
  // Utils
  import {
    formatId,
    toFixedNumber,
    recursiveToCamel,
    convertKeysToSnakeCase,
    convertAmountDecimal
  } from '@/utils/format'
  import { useCopy } from '@/utils/useCopy'
  import { type EventBusListener, useDateFormat } from '@vueuse/core'

  // components
  import IconTxsIncoming from '~icons/svg/txs-incoming.svg'
  import IconTxsOutgoing from '~icons/svg/txs-outgoing.svg'
  import BaseLoading from '@/components/base/Loading.vue'

  //   Repositories
  import getRepository, { RepoName } from '@/repositories'
  import { HydraRepository } from '@/repositories/hydra'
  import type { UtxoObject, UtxoObjectValue } from '../interfaces'
  import { TxsRepository } from '@/repositories/transaction'
  import { message } from 'ant-design-vue'
  import { storeToRefs } from 'pinia'
  import { HeadTag } from '@/composables/useHydraCore'
  import { uniq } from 'lodash-es'
  const hydraApi = getRepository(RepoName.Hydra) as HydraRepository

  const txsApi = getRepository(RepoName.Transaction) as TxsRepository

  //   Composables
  const walletCore = useWalletCore()
  const hydraCore = useHydraCore()

  const auth = useAuthV2()
  const { currentWallet } = storeToRefs(auth)

  //   Props
  const props = defineProps<{
    wallet: {
      id: string
    }
    sessionData: {
      utxo: UtxoObject
      mnemonic: string
      senderAddr: string
      derivationPath: string[]
    }
  }>()

  const emits = defineEmits<{
    onFinished: []
  }>()

  const firstUxto = computed(() => ({
    txId: Object.keys(props.sessionData.utxo)[0],
    data: props.sessionData.utxo[Object.keys(props.sessionData.utxo)[0]]
  }))

  // const snapshotUtxo = ref<UtxoObject>()
  const snapshotAmount = ref(firstUxto.value.data?.value?.lovelace || 0)

  const formData = reactive({
    amount: '',
    address: ''
  })

  type HistoryItem = {
    id: string
    amount: number
    insertedAt: {
      time: number
    }
    direction: 'incoming' | 'outgoing'
    outputs: Array<{
      address: string
      amount: {
        quantity: number
      }
    }>
  }
  const historyItems = ref<HistoryItem[]>([])

  hydraCore.events.on((event, payload) => {
    console.log('>>> / file: TransferScreen.vue:80 / event:', event, payload)

    if (event === hydraCore.EVENT_NAME.HYDRA_STATE) {
      console.log('>>> / file: TransferScreen.vue:83 / payload:', payload)
    }
  })

  const refScrollContainer = ref<HTMLDivElement>()
  const isSendingTxs = ref(false)

  const receiverAddr = ref('')
  const selectionReceiverAddrs = ref<string[]>([])

  async function onClickSend() {
    console.log('onClickSend')
    isSendingTxs.value = true
    hydraApi
      .construct(currentWallet.value!.id, {
        amount: Number.parseFloat(formData.amount) * 1e6,
        sender: firstUxto.value.data.address,
        receiver: receiverAddr.value,
        derivationPath: props.sessionData.derivationPath,
        mnemonic: props.sessionData.mnemonic
      })
      .then(signedTxCborHex => {
        console.log('>>> / file: TransferScreen.vue:78 / signedTxCborHex:', signedTxCborHex)
        return hydraApi.transfer(currentWallet.value!.id, { cborHex: signedTxCborHex })
      })
      .then(transferRs => {
        if (!transferRs.valid || !transferRs.txId || transferRs.message?.toLowerCase().includes('error')) {
          throw new Error('Failed to send transaction')
        }

        return hydraApi.snapshotUtxo(currentWallet.value!.id, {})
      })
      .then(snapshotUtxoRs => {
        console.log('>>> / file: TransferScreen.vue:100 / snapshotUtxoRs:', snapshotUtxoRs)
        // snapshotUtxo.value = snapshotUtxoRs
      })
      .catch(error => {
        console.log('>>> / file: TransferScreen.vue:66 / error:', error)
        message.error(error.message)
      })
      .finally(() => {
        isSendingTxs.value = false
        nextTick(() => {
          refScrollContainer.value?.scrollTo({
            top: refScrollContainer.value.scrollHeight + 10000,
            behavior: 'smooth'
          })
        })
      })
  }

  // Modal confirm finish
  hydraCore.tagEvents.on((event, payload) => {
    console.log('>>> / file: TransferScreen.vue:149 / tagEvents:', event, payload)
    if (event === HeadTag.Greetings) {
      updateSnapshotUTxO(payload.snapshotUtxo)
    } else if (event === HeadTag.GetUTxOResponse) {
      updateSnapshotUTxO(payload.utxo)
    } else if (event === HeadTag.SnapshotConfirmed) {
      hydraCore.sendCommand('GetUTxO')
    } else if (event === HeadTag.TxValid) {
      handleNewTx(payload.transaction)
    } else if (event === HeadTag.HeadIsClosed) {
      openModalResult()
    }
  })
  const resendCommandCloseInterval = ref<NodeJS.Timeout>()
  const isShowModalConfirmFinish = ref(false)
  const isClosing = ref(false)
  function onClickFinish() {
    isClosing.value = true
    isShowModalConfirmFinish.value = false
    hydraCore.sendCommand('Close')
    resendCommandCloseInterval.value = setTimeout(() => {
      hydraCore.sendCommand('Close')
    }, 30000)
    openModalResult()
    // hydraApi
    //   .close()
    //   .then(rs => {
    //     console.log('>>> / file: TransferScreen.vue:134 / rs:', rs)
    //   })
    //   .catch(error => {
    //     console.log('>>> / file: TransferScreen.vue:138 / error:', error)
    //   })
    //   .finally(() => {
    //     isClosing.value = false
    //     openModalResult()
    //   })
  }

  // Modal result
  const isShowModalResult = ref(false)
  const result = ref({
    utxo: {} as UtxoObject
  })
  const loadingResult = ref(false)
  const status = ref<'' | 'CLOSED' | 'READY_FANOUT'>('')
  const headStatus = readonly(storeToRefs(hydraCore).headStatus)
  const getStatus = computed<string>(() => {
    if (status.value === '' && isClosing) return `Closing head. It may take a few minutes.`
    else if (status.value === 'CLOSED') return 'Head is closed! Waiting for fanout available'
    else if (status.value === 'READY_FANOUT') return 'Ready to fanout.'
    else return ''
  })

  const showBtnManualSendClose = ref(false)
  const eventListenerModalResult: EventBusListener<any, any> = (event: HeadTag, payload: any) => {
    console.log('>>> / file: TransferScreen.vue / eventListenerModalResult:', event, payload)
    if (event === HeadTag.HeadIsFinalized) {
      loadingResult.value = false
      result.value.utxo = payload?.utxo || {}
    } else if (event === HeadTag.PostTxOnChainFailed) {
      loadingResult.value = true
      showBtnManualSendClose.value = true
      message.error('Failed to close transaction, Retry after 30s')
      clearTimeout(resendCommandCloseInterval.value)
      resendCommandCloseInterval.value = setTimeout(() => {
        if (hydraCore.headStatus !== 'Final') {
          showBtnManualSendClose.value = true
          hydraCore.sendCommand('Close')
        }
      }, 30000)
    } else if (event === HeadTag.HeadIsClosed) {
      // loadingResult.value = false
      status.value = 'CLOSED'
      clearTimeout(resendCommandCloseInterval.value)
    }
  }

  function manualSendCloseCommand() {
    clearTimeout(resendCommandCloseInterval.value)
    showBtnManualSendClose.value = false
    hydraCore.sendCommand('Close')
  }

  function openModalResult() {
    isShowModalResult.value = true
    loadingResult.value = true
    hydraCore.tagEvents.on(eventListenerModalResult)
  }
  function onCloseModalResult() {
    loadingResult.value = false
    hydraCore.tagEvents.off(eventListenerModalResult)
    emits('onFinished')
    console.log('>>> / file: TransferScreen.vue:161 / onCloseModalResult')
  }

  const parseListUTxO = (utxo: UtxoObject) => {
    return Object.keys(utxo).map(key => ({
      txId: key,
      data: utxo[key]
    }))
  }

  const listUxto = ref<Array<UtxoObjectValue & { txId: string }>>([])
  function updateSnapshotUTxO(snapshotUtxo: UtxoObject) {
    listUxto.value = Object.keys(snapshotUtxo).map(key => ({
      txId: key,
      ...snapshotUtxo[key]
    }))
    const snapshotUtxoList = Object.values(snapshotUtxo)
    snapshotAmount.value = snapshotUtxoList
      .filter(utxo => utxo.address === props.sessionData.senderAddr)
      .reduce((acc, cur) => acc + cur.value.lovelace, 0)
    selectionReceiverAddrs.value = uniq(
      snapshotUtxoList.filter(utxo => utxo.address !== props.sessionData.senderAddr).map(utxo => utxo.address)
    )
  }

  type NewTx = {
    cborHex: string
    txId: string
  }
  function handleNewTx(transaction: NewTx) {
    //
    const txParse = walletCore.viewTransaction(transaction.cborHex)
    if (!txParse) return
    console.log(txParse, listUxto.value)
    const utxoInputs = txParse.inputs.map(input => {
      const utxo = listUxto.value.filter(utxo => utxo.txId === `${input.transaction_id}#${input.index}`)[0]
      return {
        ...utxo,
        txId: input.transaction_id
      }
    })
    console.log('\n\n\n>>> / file: TransferScreen.vue:238 / utxoInputs:', utxoInputs)
    if (!utxoInputs.length) {
      console.warn('UTxO not found')
      return
    }
    const txDirection = utxoInputs[0].address === props.sessionData.senderAddr ? 'outgoing' : 'incoming'

    const coinOutputByUxtoInput = txParse.outputs.filter(output => output.address === utxoInputs[0].address)[0]?.amount
      .coin
    const totalCoinInput = utxoInputs.reduce((acc, cur) => acc + cur.value.lovelace, 0)
    const coinChange = Math.abs(+coinOutputByUxtoInput - +totalCoinInput)
    const historyItem: HistoryItem = {
      id: transaction.txId,
      amount: coinChange,
      insertedAt: {
        time: Date.now()
      },
      direction: txDirection,
      outputs: txParse.outputs.map(output => ({
        address: output.address,
        amount: {
          quantity: +output.amount.coin
        }
      }))
    }
    historyItems.value.push(historyItem)
  }

  const queryUtxo = () => {
    hydraCore.sendCommand('GetUTxO')
  }

  onMounted(() => {})
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <div class="mb-2 flex items-center justify-between">
      <div class="flex flex-col justify-center">
        <!-- <button class="mr-1 flex items-center" @click="queryUtxo()">
          <icon icon="ic:baseline-sync" :height="16" />
        </button>
        -->
        <span class=""> {{ convertAmountDecimal(snapshotAmount / 1e6, 'ADA') }} ₳ </span>
        <span class="text-xs">
          {{ formatId(props.sessionData.senderAddr, 10, 15) }}
        </span>
      </div>
      <a-button
        type="default"
        class="!rounded-3 !bg-primary btn-shadow-primary border-primary !w-30 !h-10 text-white"
        @click="() => (isShowModalConfirmFinish = true)"
      >
        Finish
      </a-button>
    </div>
    <div
      class="scroll-bar-primary mt-2 flex-grow overflow-y-auto pr-1"
      border="t t-solid t-gray-2"
      ref="refScrollContainer"
    >
      <div class="txs-history-wrapper">
        <a-collapse ghost :expandIconPosition="'end'">
          <template #expandIcon="data">
            <icon
              icon="tabler:chevron-right"
              height="20"
              class="transition-all"
              :class="[data?.isActive ? 'rotate-90' : 'rotate-0']"
            />
          </template>
          <a-collapse-panel
            class="txs-history-item"
            v-for="(item, index) in historyItems"
            :key="index"
            :class="['outgoing' === 'outgoing' ? 'bg-[#FFF4F3]' : 'bg-[#F3FFF6]']"
          >
            <template #header="data">
              <div class="flex w-full items-center justify-between">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white">
                  <IconTxsIncoming v-if="'incoming' !== 'incoming'" size="5" />
                  <IconTxsOutgoing v-else size="5" />
                </div>
                <div class="flex-grow-1 mx-2 flex items-center justify-between">
                  <div class="">
                    <div class="">
                      <span class="font-500 text-sm">
                        {{ formatId(item.id, 6, 9) }}
                        <icon
                          icon="tabler:copy"
                          height="14"
                          class="-mb-2px ml-2px inline hover:cursor-pointer"
                          @click="useCopy(item.id)"
                        />
                      </span>
                    </div>
                    <p class="font-400 text-gray-4 !mb-0 text-xs">
                      {{
                        item.insertedAt ? useDateFormat(item.insertedAt.time, 'DD/MM/YYYY, hh:mm A').value : 'Pending'
                      }}
                    </p>
                  </div>
                  <div class="">
                    <span
                      class="font-600 text-xs"
                      :class="[item.direction === 'incoming' ? 'text-[#16BD4F]' : 'text-[#D63C37]']"
                    >
                      {{ item.direction === 'incoming' ? '+' : '-' }}{{ toFixedNumber(item.amount / 1e6, 6) }} ₳
                    </span>
                  </div>
                </div>
              </div>
            </template>
            <div class="">
              <div class="flex justify-between">
                <div class="">
                  <span class="font-600 block text-xs">{{ item.outputs?.length }} UTxO Output(s)</span>
                  <div class="mt-1">
                    <div
                      class="bg-gray-2 rounded-1 mb-1 px-2 py-1 last:mb-0"
                      v-for="output in item.outputs"
                      :key="output.address"
                    >
                      <p class="font-600 mb-1 text-xs">
                        {{ formatId(output.address, 12, 10) }}
                        <icon
                          icon="tabler:copy"
                          height="14"
                          class="-mb-2px ml-2px inline hover:cursor-pointer"
                          @click="useCopy(output.address)"
                        />
                      </p>
                      <p class="font-500 mb-0 text-right text-xs">
                        {{ toFixedNumber(output.amount.quantity / 1e6, 2) }}₳
                      </p>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-600 block text-xs">Fee</span>
                  <span class="font-600 block text-xs text-[#D63C37]">{{ toFixedNumber(0 / 1e6, 6) }}</span>
                </div>
              </div>
              <div class="mt-2">Assets</div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
    <div class="mt-4 pt-4" border="t t-solid t-gray-2">
      <div class="">
        <a-select ref="select" v-model:value="receiverAddr" class="w-[calc(100%-96px)]">
          <a-select-option :value="item" v-for="(item, i) in selectionReceiverAddrs" :key="i">
            {{ formatId(item, 16, 10) }}
          </a-select-option>
        </a-select>
      </div>
      <div class="mt-2 flex">
        <div class="mr-4 flex-grow">
          <a-input
            v-model:value="formData.amount"
            addon-before="Amount"
            size="large"
            class="!rounded-3 !bg-gray-1 border-gray-3 !w-full"
            placeholder="Enter amount"
          />
        </div>
        <a-button
          type="default"
          :disabled="!formData.amount || !snapshotAmount || +formData.amount * 1e6 > snapshotAmount || !receiverAddr"
          :loading="isSendingTxs"
          class="!rounded-3 !bg-primary border-primary !h-10 !w-20 text-white"
          @click="onClickSend()"
        >
          Send
        </a-button>
      </div>
    </div>

    <a-modal
      v-model:open="isShowModalConfirmFinish"
      title="Confirm"
      centered
      @ok="onClickFinish"
      :confirmLoading="isClosing"
    >
      <p>Finish transaction and leave</p>
    </a-modal>
    <a-modal
      v-model:open="isShowModalResult"
      title="Result"
      centered
      :after-close="onCloseModalResult"
      :closable="false"
      :maskClosable="false"
    >
      <div v-if="loadingResult" class="flex h-20 w-full flex-col items-center justify-center">
        <base-loading :size="28" />
        <p class="font-600 text-xs" v-if="getStatus">{{ getStatus }}</p>
        <a-button v-if="showBtnManualSendClose" @click="manualSendCloseCommand">Manual close</a-button>
      </div>
      <div class="" v-else>
        <div class="flex items-center justify-between">
          <div class="font-600 text-xs">UTxO</div>
          <div class="font-600 text-xs">Amount</div>
        </div>
        <div class="max-h-260px mt-2 overflow-y-auto">
          <div
            class="bg-gray-2 rounded-1 mb-1 px-2 py-1 last:mb-0"
            v-for="utxo in parseListUTxO(result.utxo)"
            :key="utxo.txId"
          >
            <p class="font-600 mb-1 text-xs">
              {{ formatId(utxo.txId, 12, 10) }}
              <icon
                icon="tabler:copy"
                height="14"
                class="-mb-2px ml-2px inline hover:cursor-pointer"
                @click="useCopy(utxo.txId)"
              />
            </p>
            <div class="flex items-center justify-between">
              <span class="font-500 mr-2 text-xs">{{ formatId(utxo.data.address, 9, 10) }}</span>
              <span class="font-500 mb-0 text-right text-xs">
                {{ toFixedNumber(utxo.data.value.lovelace / 1e6, 6) }}₳
              </span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <a-button
          type="default"
          :disabled="loadingResult"
          @click="isShowModalResult = false"
          class="!rounded-3 !bg-primary border-primary !h-10 !w-full text-white"
        >
          Finish
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
  .txs-history-wrapper {
    .txs-history-item {
      @apply mb-2 rounded-2xl px-4 py-3 transition-all first:mt-2 last:mb-0;

      :deep(.ant-collapse-header) {
        @apply items-center p-0;
      }
    }
  }
</style>
