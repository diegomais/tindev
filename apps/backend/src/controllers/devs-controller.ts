import axios from 'axios'
import type { Request, Response } from 'express'

import Dev from '../models/dev'

class DevsController {
  async index(req: Request, res: Response) {
    try {
      const { user } = req.headers

      const loggedDev = await Dev.findById(user)

      if (!loggedDev) {
        return res.status(400).json({ error: 'User not exists.' })
      }

      const users = await Dev.find({
        $and: [
          { _id: { $ne: user } },
          { _id: { $nin: loggedDev.likes } },
          { _id: { $nin: loggedDev.dislikes } },
        ],
      })

      return res.json(users)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { username } = req.body

      const userExists = await Dev.findOne({ user: username })

      if (userExists) {
        return res.json(userExists)
      }

      const response = await axios.get(
        `https://api.github.com/users/${username}`
      )

      const { name, bio, avatar_url: avatar } = response.data

      const dev = await Dev.create({ name, user: username, bio, avatar })

      return res.json(dev)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default new DevsController()
