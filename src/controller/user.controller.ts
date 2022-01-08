import { Request, Response } from "express"
import { omit } from "lodash"
import { CreateUserInput, LoginUserInput } from "../schema/user.schema"
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

export const loginUserHandler = async (req: Request<{}, {}, LoginUserInput>, res: Response) => {
  const { body } = req
  console.log(body)
  try {
    const user = await findByEmail(body.email)
    if(!user){
      res.status(400).json({
        message: 'user not found'
      })
    }else{
      const check = await user.verifyPassword(body.password)
      if(!check) res.status(400).json({
        message: 'password not match'
      })
    }
    res.status(200).json(omit(user, ['password']))
  } catch (e: any) {
    throw new Error(e) 
  }
}