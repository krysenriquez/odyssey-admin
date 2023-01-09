import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const GET_SETTINGS_URL = `${CORE_URL}/getsettings`

export const getSettings = () => {
  return axios.get(`${GET_SETTINGS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getSetting = (values) => {
  return axios
    .get(`${GET_SETTINGS_URL}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data[0]))
}
