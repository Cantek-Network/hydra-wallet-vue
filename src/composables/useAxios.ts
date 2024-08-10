import { AxiosInstance } from '@/utils/axios'

export const useAxios = () => {
  const cardanoNodeEndpoint = import.meta.env.VITE_APP_CARDANO_NODE_ENDPOINT
  if (!cardanoNodeEndpoint) {
    console.error('VITE_APP_CARDANO_NODE_ENDPOINT is not defined')
  }
  const axios = new AxiosInstance('/', import.meta.env.VITE_APP_CARDANO_NODE_ENDPOINT)
  return axios.instance
}
