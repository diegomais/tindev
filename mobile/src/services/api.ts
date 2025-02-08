import axios from "axios";

import { apiUrl } from "@/config/settings";

export const api = axios.create({ baseURL: apiUrl });
