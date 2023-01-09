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

export const GET_TOP_EARNERS_URL = `${ACCOUNTS_URL}/gettopearners`
export const UPDATE_ACCOUNT_STATUS_URL = `${ACCOUNTS_URL}/updateuserstatus/`

export const updateMemberStatus = (values) => {
  return axios
    .post(`${UPDATE_ACCOUNT_STATUS_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getMembers = () => {
  return axios.get(`${GET_MEMBERS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getUserMember = (accountId) => {
  console.log(accountId)
  return axios
    .get(`${GET_MEMBER_INFO_URL}`, {params: {account_id: accountId}})
    .then((response) => humps.camelizeKeys(response.data[0]))
}

export const createMember = (member) => {
  return axios.post(`${CREATE_MEMBER_URL}`, humps.decamelizeKeys(member))
}

export const verifyCode = (value) => {
  return axios.post(`${VERIFY_CODE_URL}`, {activation_code: value})
}

export const verifyAccountNumber = (value) => {
  return axios.post(`${VERIFY_ACCOUNT_NUMBER_URL}`, {account_id: value})
}

export const getTopEarners = () => {
  return axios.get(`${GET_TOP_EARNERS_URL}`).then((d) => humps.camelizeKeys(d.data))
}
