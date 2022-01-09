import jwt, { decode } from 'jsonwebtoken'
import config from 'config'

export const signJwt = (
  object: Object, 
  keyname: "accessTokenPrivateKey" | "refreshTokenPrivateKey", 
  options?: jwt.SignOptions | undefined 
) => {
  const signingKey = Buffer.from(
    config.get<string>(keyname),
    "base64"
  ).toString('ascii')

  return jwt.sign(object, signingKey,{
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJwt = <T>(
  token: string,
  keyname:  "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  const publicKey = Buffer.from(
    config.get<string>(keyname),
    'base64'
  ).toString('ascii')

  try {
    const decoded = jwt.verify(token, publicKey) as T
    return decoded
  } catch (e) {
    return null 
  }
}