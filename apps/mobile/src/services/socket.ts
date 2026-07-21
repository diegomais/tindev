import io from "socket.io-client";

import { apiUrl } from "@/config/settings";

export const getSocketInstance = (user: string) =>
  io(apiUrl, { query: { user } });
