import { Response, Router } from 'express'
import userRouter from './user.routes'

const router = Router()

router.get('/test', (_, res: Response) => res.sendStatus(200))
router.use('/api/users', userRouter)

export default router