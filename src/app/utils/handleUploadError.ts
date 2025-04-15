import { Response } from 'express'
import { MulterError } from 'multer'
import AppError from '../error/AppError'

export const handleUploadError = (error: Error, res: Response) => {
  if (error instanceof MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          message: 'File is too large. Maximum size is 5MB',
        })
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          message: 'Unexpected field in file upload',
        })
      default:
        return res.status(400).json({
          success: false,
          message: error.message,
        })
    }
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error during file upload',
  })
}
