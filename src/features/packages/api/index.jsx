import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core
`
export const GET_PACKAGES_URL = `${CORE_URL}/getpackages`

const getPackages = () => {
  return axios.get(`${GET_PACKAGES_URL}`).then((d) => d.data)
}

export {getPackages}
