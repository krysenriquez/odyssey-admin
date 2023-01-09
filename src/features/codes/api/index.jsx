import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core
`
export const GET_CODES_URL = `${CORE_URL}/getcodes`
const CREATE_CODES_URL = `${CORE_URL}/generatecode/`
const UPDATE_CODE_STATUS_URL = `${CORE_URL}/updatecodestatus/`

export const getCodes = () => {
  return axios.get(`${GET_CODES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const generateCode = (values) => {
  return axios.post(`${CREATE_CODES_URL}`, humps.decamelizeKeys(values))
}

export const updateCodeStatus = (values) => {
  return axios
    .post(`${UPDATE_CODE_STATUS_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}
