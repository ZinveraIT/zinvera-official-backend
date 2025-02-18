import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../error/AppError'
import config from '../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { user } from '../modules/auth/user.model'

const auth = (...requiredRole: string[]) => {
  // console.log('auth middleware triggered ')
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log('auth middleware inside ')
    const extractedToken = req.headers.authorization
    const token = (extractedToken as string).split(' ')[1]

    if (!token) {
      throw new AppError(400, 'You are not authorized to access')
    }
    // check if the token is valid
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload
    const { email, role } = decoded

    const userData = await user.findOne({ email: email })
    // check user already exit
    if (!userData) {
      throw new AppError(404, 'User is not found')
    }

    // check if the user is blocked
    const Status = userData?.isBlocked
    if (Status) {
      throw new AppError(400, 'The user is blocked ')
    }

    // role base Authorized
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(400, 'Unauthorized  to access !')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
