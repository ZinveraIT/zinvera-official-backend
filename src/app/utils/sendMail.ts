import nodemailer from 'nodemailer'

const sendMail = async (
  to: string,
  userEmail: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'zinverait@gmail.com',
      pass: 'mekg bbha rbam jzep',
    },
  })

  await transporter.sendMail({
    from: '"Contact Form" zinverait@gmail.com', // Gmail requires this to match the authenticated user
    to,
    replyTo: userEmail, // ✅ This lets you reply to the user directly
    subject,
    html,
  })
}

export default sendMail
