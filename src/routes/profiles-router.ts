import { Router } from 'express'
import { profilesController } from '../controllers'
import { getProfile } from '../middlewares'

const router = Router().get('/me', getProfile, profilesController.getMyProfile)

export default router
