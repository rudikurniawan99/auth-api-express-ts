import User, { UserDocument } from "../models/user.model";

export const createUser = (input: Partial<UserDocument>) => {
  return User.create(input)
}