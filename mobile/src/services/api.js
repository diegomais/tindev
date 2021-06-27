import axios from 'axios';
import getEnvironment from '../../environment';

const { apiUrl } = getEnvironment();

const api = axios.create({ baseURL: apiUrl });

export default api;
