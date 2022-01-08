import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstname: string({
      required_error: 'firstname is required'
    }),
    lastname: string(),
    email: string({
      required_error: 'email is required'
    }).email('need a valid email'),
    password: string({
      required_error: 'password is required'
    }).min(8, 'minimum have 8 character'),
    passwordConfirmation: string()
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'password not match',
    path: ['passwordConfirmation']
  })
})

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'email is required'
    }).email('must be a valid email'),
    password: string({
      required_error: 'password is required'
    }).min(8, 'have 8 character minimum')
  })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>['body'], "passwordConfirmation">
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body']