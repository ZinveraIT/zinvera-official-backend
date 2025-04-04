import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/router'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/error/notFound'
const app: Application = express()

// middleware
app.use(express.json())
// app.use(cors())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use('/api', router)

app.use('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
