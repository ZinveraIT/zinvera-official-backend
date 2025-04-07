import nodemailer from 'nodemailer'

const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'zinverait@gmail.com',
      pass: 'mekg bbha rbam jzep',
    },
  })

  await transporter.sendMail({
    from: 'zinvera IT', // sender address
    to, // list of receivers
    subject: 'Reset your password ', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  })

  //  console.log('Message sent: %s', info.messageId)
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export default sendMail
