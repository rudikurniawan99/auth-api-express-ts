import { Request, Response } from "express"
import { CreateUserInput } from "../schema/user.schema"
import { createUser, findByEmail } from "../services/user.services"

export const createUserHandler = async (req: Request<{},{}, CreateUserInput>, res: Response) => {
  const { body } = req 

  try {

    const checkEmail = await findByEmail(body.email)
    if(checkEmail){
      res.status(402).json({
        error: true,
        message: 'email already exist'
      })
    }

    const user = await createUser(body)  
    res.status(201).json({
      firstname: user.firstname,
    })
  } catch (e: any) {
    throw new Error(e) 
  }
}