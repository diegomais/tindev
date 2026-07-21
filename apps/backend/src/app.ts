import cors from 'cors'
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import mongoose from 'mongoose'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { MONGODB_URI } from './config/env'
import routes from './routes'

const app = express()

app.use(cors())

const httpServer = createServer(app)
const options = { cors: { origin: '*', methods: ['GET', 'POST'] } }
const io = new Server(httpServer, options)

const connectedUsers: { [key: string]: string } = {}

io.on('connection', (socket) => {
  const { user } = socket.handshake.query
  if (typeof user === 'string') {
    connectedUsers[user] = socket.id
  }
})

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)

app.use((req: Request, _res: Response, next: NextFunction) => {
  req.io = io
  req.connectedUsers = connectedUsers
  return next()
})

app.use(express.json())
app.use(routes)

export default httpServer
