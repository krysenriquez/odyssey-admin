import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const CORE_URL = `${API_URL}/core`

// GET
export const GET_ALL_WALLET_SUMMARY_LIST = `${CORE_URL}/getallwalletsummarylist`
export const GET_WALLET_SUMMARY_LIST = `${CORE_URL}/getwalletsummarylist`
// POST
export const GET_WALLET_SUMMARY = `${CORE_URL}/getwalletsummary/`
export const GET_COMPANY_WALLET_SUMMARY = `${CORE_URL}/getcompanywalletsummary/`

export const GET_PV_MEMBER_WALLET_URL = `${CORE_URL}/getpvwalletsummary/`
export const GET_MEMBER_WALLET_SUMMARY_URL = `${CORE_URL}/getmemberwalletsummary/`
export const GET_ACTIVITY_TOTAL_AMOUNT_URL = `${CORE_URL}/getactivitytotalamount/`

export const getAllWalletSummaryList = (values) => {
  return axios
    .get(`${GET_ALL_WALLET_SUMMARY_LIST}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getWalletSummary = (accountId) => {
  return axios
    .post(`${GET_WALLET_SUMMARY}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getCompanyWalletSummary = () => {
  return axios.post(`${GET_COMPANY_WALLET_SUMMARY}`).then((d) => humps.camelizeKeys(d.data))
}

export const getPointValuesMemberWalletSummary = (accountId) => {
  return axios
    .post(`${GET_PV_MEMBER_WALLET_URL}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getMemberWalletSummary = (accountId) => {
  return axios.post(`${GET_MEMBER_WALLET_SUMMARY_URL}`, {account_id: accountId})
}

export const getActivityTotalSummary = (accountId) => {
  return axios.post(`${GET_ACTIVITY_TOTAL_AMOUNT_URL}`, {account_id: accountId})
}
