import { Router } from "express";
import { createUserHandler, loginUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";

const router = Router()

router.post('/', validateResource(createUserSchema), createUserHandler)
router.get('/login', validateResource(loginUserSchema), loginUserHandler)

export default router