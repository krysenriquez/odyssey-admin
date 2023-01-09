import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const CORE_URL = `${API_URL}/core`

export const GET_ACTIVITY_URL = `${CORE_URL}/getactivities`
// POST
export const GET_ALL_ACTIVITY_SUMMARY_INFO_URL = `${CORE_URL}/getallactivitysummaryinfo/`
export const GET_ALL_ACTIVITY_SUMMARY_TOTAL_AMOUNT_URL = `${CORE_URL}/getallactivitytotalamount/`

export const GET_ACTIVITY_SUMMARY_INFO_URL = `${CORE_URL}/getactivitysummaryinfo/`
export const GET_ACTIVITY_SUMMARY_TOTAL_AMOUNT_URL = `${CORE_URL}/getactivitytotalamount/`

export const getActivity = (values) => {
  return axios
    .get(`${GET_ACTIVITY_URL}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getAllActivitySummaryCount = () => {
  return axios.post(`${GET_ALL_ACTIVITY_SUMMARY_INFO_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getActivitySummaryCount = (accountId) => {
  return axios
    .post(`${GET_ACTIVITY_SUMMARY_INFO_URL}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getActivitySummaryTotal = (accountId) => {
  return axios
    .post(`${GET_ACTIVITY_SUMMARY_TOTAL_AMOUNT_URL}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getAllActivitySummaryTotal = () => {
  return axios
    .post(`${GET_ALL_ACTIVITY_SUMMARY_TOTAL_AMOUNT_URL}`)
    .then((d) => humps.camelizeKeys(d.data))
}
