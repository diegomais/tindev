import axios from 'axios';
import getEnvironmentVariables from '../../environment';

const { apiUrl } = getEnvironmentVariables();

const api = axios.create({ baseURL: apiUrl });

export default api;
