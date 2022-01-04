import { Response, Router } from 'express'

const router = Router()

router.get('/test', (_, res: Response) => res.sendStatus(200))

export default router