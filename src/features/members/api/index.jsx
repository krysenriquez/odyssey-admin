import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const ACCOUNTS_URL = `${API_URL}/accounts
`
export const GET_MEMBERS_URL = `${ACCOUNTS_URL}/getmembers`

const getMembers = () => {
  return axios.get(`${GET_MEMBERS_URL}`).then((d) => d.data)
}

const getUserMember = (id) => {
  return axios
    .get(`${ACCOUNTS_URL}/${id}`)
    .then((response) => response.data)
    .then((response) => response.data)
}

const createMember = (user) => {
  return axios
    .put(ACCOUNTS_URL, user)
    .then((response) => response.data)
    .then((response) => response.data)
}

const updateMember = (user) => {
  return axios
    .post(`${ACCOUNTS_URL}/${user.id}`, user)
    .then((response) => response.data)
    .then((response) => response.data)
}

export {getMembers, getUserMember, createMember, updateMember}
