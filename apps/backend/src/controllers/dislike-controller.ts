import type { Request, Response } from 'express'

import Dev from '../models/dev'

class DislikeController {
  async store(req: Request, res: Response) {
    try {
      const { user } = req.headers
      const { devId } = req.params

      if (user === devId) {
        return res.status(400).json({ error: 'User cannot dislike himself.' })
      }

      const loggedDev = await Dev.findById(user)

      if (!loggedDev) {
        return res.status(400).json({ error: 'User not exists.' })
      }

      const targetDev = await Dev.findById(devId)

      if (!targetDev) {
        return res.status(400).json({ error: 'Dev not exists.' })
      }

      if (loggedDev.dislikes.includes(targetDev._id)) {
        return res.status(400).json({ error: 'Dev already disliked.' })
      }

      loggedDev.dislikes.push(targetDev._id)

      await loggedDev.save()

      return res.json(loggedDev)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default new DislikeController()
