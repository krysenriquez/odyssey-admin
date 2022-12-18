import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const GET_PACKAGES_URL = `${CORE_URL}/getpackages`
const CREATE_PACKAGE_URL = `${CORE_URL}/createpackage/`

export const getPackages = () => {
  return axios.get(`${GET_PACKAGES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const postPackage = (values) => {
  return axios.post(`${CREATE_PACKAGE_URL}`, humps.decamelizeKeys(values))
}
