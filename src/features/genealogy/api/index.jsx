import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const ACCOUNTS_URL = `${API_URL}/accounts`
export const GET_GENEALOGY_URL = `${ACCOUNTS_URL}/getgenealogy`
export const GET_GENEALOGY_ADMIN_URL = `${ACCOUNTS_URL}/getgenealogyadmin`

export const getGenealogy = (accountId) => {
  return axios
    .get(`${GET_GENEALOGY_ADMIN_URL}`, {params: {account_id: accountId}})
    .then((d) => humps.camelizeKeys(d.data))
}
