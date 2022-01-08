import nodemailer, { SendMailOptions } from 'nodemailer'
import config from 'config'
import log from './logger'

// const testAccount = async () => {
//   const account = await nodemailer.createTestAccount()
//   console.log(account)
// }


// console.log(testAccount())

const smtp = config.get<{
  user: string,
  pass: string,
  host: string,
  port: number,
  secure: boolean
}>("smtp")

console.log({...smtp})
const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass
  }
})

const sendEmail = async (payload: SendMailOptions) => {
  await transporter.sendMail(payload, (err, info) => {
    if(err){
      log.error(err)
      return;
    }
    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  })
} 

export default sendEmail