import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ACCOUNTS_URL = `${API_URL}/accounts`
const CORE_URL = `${API_URL}/core`

export const VERIFY_CODE_URL = `${CORE_URL}/verifycode/`
export const VERIFY_ACCOUNT_NUMBER_URL = `${ACCOUNTS_URL}/verifyaccount/`
export const CREATE_MEMBER_URL = `${ACCOUNTS_URL}/create/`

export const GET_MEMBERS_URL = `${ACCOUNTS_URL}/getmembers`
export const GET_MEMBER_INFO_URL = `${ACCOUNTS_URL}/getprofile`

export const GET_PV_MEMBER_WALLET_URL = `${CORE_URL}/getpvwalletsummary/`
export const GET_MEMBER_WALLET_SUMMARY_URL = `${CORE_URL}/getmemberwalletsummary/`

export const GET_ACTIVITY_TOTAL_AMOUNT_URL = `${CORE_URL}/getactivitytotalamount/`

const updateMember = (user) => {
  return axios.post(`${ACCOUNTS_URL}/${user.id}`, user).then((response) => response.data)
}

const getMembers = () => {
  return axios.get(`${GET_MEMBERS_URL}`).then((d) => d.data)
}

const getUserMember = (account_id) => {
  return axios
    .get(`${GET_MEMBER_INFO_URL}`, {params: {account_id: account_id}})
    .then((response) => humps.decamelizeKeys(response.data))
}

const createMember = (member) => {
  return axios.post(`${CREATE_MEMBER_URL}`, humps.decamelizeKeys(member))
}

const verifyCode = (value) => {
  return axios.post(`${VERIFY_CODE_URL}`, {activation_code: value})
}

const verifyAccountNumber = (value) => {
  return axios.post(`${VERIFY_ACCOUNT_NUMBER_URL}`, {account_id: value})
}

export const getPointValuesMemberWalletSummary = (account_id) => {
  return axios.post(`${GET_PV_MEMBER_WALLET_URL}`, {account_id: account_id})
}

export const getMemberWalletSummary = (account_id) => {
  return axios.post(`${GET_MEMBER_WALLET_SUMMARY_URL}`, {account_id: account_id})
}

export const getActivityTotalSummary = (account_id) => {
  return axios.post(`${GET_ACTIVITY_TOTAL_AMOUNT_URL}`, {account_id: account_id})
}

export {getMembers, getUserMember, createMember, updateMember, verifyCode, verifyAccountNumber}
