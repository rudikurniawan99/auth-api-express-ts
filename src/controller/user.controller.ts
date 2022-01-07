import { Request, Response } from "express"
import { CreateUserInput } from "../schema/user.schema"
import { createUser } from "../services/user.services"

export const createUserHandler = async (req: Request<{},{}, CreateUserInput>, res: Response) => {
  const { body } = req 

  try {
    const user = await createUser(body)  
    res.status(201).json({
      message: 'succes to create data',
      ...user
    })
  } catch (e: any) {
    throw new Error(e) 
  }
}