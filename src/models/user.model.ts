import mongoose from 'mongoose'
import argon2 from 'argon2'

export interface UserDocument extends mongoose.Document{
  firstname: string
  lastname: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

userSchema.pre('save', async function(next) {
  let user = this as UserDocument
  if(!user.isModified('password')){
    next()
  }

  const hash = await argon2.hash(user.password)
  user.password = hash
  next()
})

userSchema.methods.verifyPassword = async function(inputPassword: string): Promise<boolean>{
  const user = this as UserDocument
  try {
    return await argon2.verify(user.password, inputPassword)
  } catch (e) {
    return false 
  }

}

const User = mongoose.model<UserDocument>('User', userSchema)

export default User