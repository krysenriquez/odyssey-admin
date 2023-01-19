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
export const GET_MEMBER_USER_INFO_URL = `${ACCOUNTS_URL}/getmemberuser`
export const GET_TOP_EARNERS_URL = `${ACCOUNTS_URL}/gettopearners`
export const UPDATE_ACCOUNT_STATUS_URL = `${ACCOUNTS_URL}/updateuserstatus/`
const UPDATE_PROFILE_ADMIN_URL = `${ACCOUNTS_URL}/updateprofileadmin/`

const USER_URL = `${API_URL}/users`
const CHANGE_USERNAME_ADMIN_URL = `${USER_URL}/changeusernameadmin/`
const CHANGE_PASSWORD_ADMIN_URL = `${USER_URL}/changepasswordadmin/`
const CHANGE_EMAIL_ADDRESS_ADMIN_URL = `${USER_URL}/changeemailaddressadmin/`

export const updateMemberStatus = (values) => {
  return axios
    .post(`${UPDATE_ACCOUNT_STATUS_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getMembers = () => {
  return axios.get(`${GET_MEMBERS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getUserMember = (accountId) => {
  return axios
    .get(`${GET_MEMBER_INFO_URL}`, {params: {account_id: accountId}})
    .then((response) => humps.camelizeKeys(response.data[0]))
}

export const getUserMemberInfo = (accountId) => {
  return axios
    .get(`${GET_MEMBER_USER_INFO_URL}`, {params: {account_id: accountId}})
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

export const updateAccountProfile = (values) => {
  return axios.post(`${UPDATE_PROFILE_ADMIN_URL}`, values, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const changeUsername = (values) => {
  return axios.post(`${CHANGE_USERNAME_ADMIN_URL}`, humps.decamelizeKeys(values))
}

export const changePassword = (values) => {
  return axios.post(`${CHANGE_PASSWORD_ADMIN_URL}`, humps.decamelizeKeys(values))
}

export const changeEmailAddress = (values) => {
  return axios.post(`${CHANGE_EMAIL_ADDRESS_ADMIN_URL}`, humps.decamelizeKeys(values))
}
