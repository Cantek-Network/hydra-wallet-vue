import { AxiosInstance } from '@/utils/axios'

export const useAxios = () => {
  const cardanoNodeEndpoint = import.meta.env.VITE_APP_CARDANO_NODE_ENDPOINT
  // const cardanoNodeEndpoint = 'http://localhost:3002'
  if (!cardanoNodeEndpoint) {
    console.error('VITE_APP_CARDANO_NODE_ENDPOINT is not defined')
  }
  const axios = new AxiosInstance('/', cardanoNodeEndpoint)
  return axios.instance
}
