import express from 'express'
import { videoController } from '../controllers/videoController.js'

const route = express.Router()

route.get('/video/stream', videoController)

export default route