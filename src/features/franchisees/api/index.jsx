import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const GET_FRANCHISEE_LIST_URL = `${CORE_URL}/getallfranchiseelist`
export const GET_MEMBERS_FRANCHISEE_SUMMARY_URL = `${CORE_URL}/getallmembersfranchiseesummaryinfo/`

export const getFranchisees = () => {
  return axios.get(`${GET_FRANCHISEE_LIST_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getAllMembersFranchiseesSummariesCount = () => {
  return axios.post(`${GET_MEMBERS_FRANCHISEE_SUMMARY_URL}`).then((d) => humps.camelizeKeys(d.data))
}
