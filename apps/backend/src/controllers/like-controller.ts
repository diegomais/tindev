import type { Request, Response } from 'express'

import Dev from '../models/dev'

class LikeController {
  async store(req: Request, res: Response) {
    try {
      const { user } = req.headers

      if (typeof user !== 'string') {
        return res.status(400).json({ error: 'User not exists.' })
      }

      const { devId } = req.params

      if (user === devId) {
        return res.status(400).json({ error: 'User cannot like himself.' })
      }

      const loggedDev = await Dev.findById(user)

      if (!loggedDev) {
        return res.status(400).json({ error: 'User not exists.' })
      }

      const targetDev = await Dev.findById(devId)

      if (!targetDev) {
        return res.status(400).json({ error: 'Dev not exists.' })
      }

      if (loggedDev.likes.includes(targetDev._id)) {
        return res.status(400).json({ error: 'Dev already liked.' })
      }

      if (targetDev.likes.includes(loggedDev._id)) {
        const loggedSocket = req.connectedUsers[user]
        const targetSocket = req.connectedUsers[devId]

        if (loggedSocket) {
          req.io.to(loggedSocket).emit('match', targetDev)
        }

        if (targetSocket) {
          req.io.to(targetSocket).emit('match', loggedDev)
        }
      }

      loggedDev.likes.push(targetDev._id)

      await loggedDev.save()

      return res.json(loggedDev)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default new LikeController()
