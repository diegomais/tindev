import axios from 'axios'
import getEnvironment from '../config/environment'

const { apiUrl } = getEnvironment()

const api = axios.create({ baseURL: apiUrl })

export default api
