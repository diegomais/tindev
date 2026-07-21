import type { Server } from 'socket.io'

declare global {
  namespace Express {
    interface Request {
      connectedUsers: { [key: string]: string }
      io: Server
    }
  }
}
