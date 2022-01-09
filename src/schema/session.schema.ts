import { object, string, TypeOf } from "zod"

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'need email'
    }).email('need a valid email'),
    password: string({
      required_error: 'need a password'
    }).min(8, 'minimum have 8 character')
  })
}) 

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body']