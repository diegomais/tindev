import { Router } from 'express'

import DevController from './controllers/devs-controller'
import DislikeController from './controllers/dislike-controller'
import LikeController from './controllers/like-controller'

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)

export default routes
