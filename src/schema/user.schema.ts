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


export type CreateUserInput = TypeOf<typeof createUserSchema>['body']