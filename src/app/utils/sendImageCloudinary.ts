/* eslint-disable @typescript-eslint/no-explicit-any */
import multer, { StorageEngine } from 'multer'
import path from 'path'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import fs from 'fs'
import config from '../config'
import AppError from '../error/AppError'

// Cloudinary Config
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
})

// File Type Validation
const allowedFileTypes = {
  image: ['.jpg', '.jpeg', '.png', '.webp'],
  video: ['.mp4', '.mov', '.avi', '.webm']
}

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase()
  
  if (file.fieldname === 'image' && !allowedFileTypes.image.includes(ext)) {
    cb(new AppError(400, 'Only jpg, jpeg, png and webp files are allowed for images'))
    return
  }
  
  if (file.fieldname === 'video' && !allowedFileTypes.video.includes(ext)) {
    cb(new AppError(400, 'Only mp4, mov, avi and webm files are allowed for videos'))
    return
  }

  cb(null, true)
}

// Enhanced Storage Configuration
const storage: StorageEngine = multer.diskStorage({
  destination(req, file, callback) {
    const uploadPath = './uploads'
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    callback(null, uploadPath)
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname).toLowerCase()
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`
    callback(null, fileName)
  }
})

// Enhanced Multer Configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
])

// Enhanced Cloudinary Upload with retry and better error handling
const uploadToCloudinary = async (
  localFilePath: string,
  resourceType: 'image' | 'video'
): Promise<string> => {
  const maxRetries = 3
  let attempt = 0

  while (attempt < maxRetries) {
    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload(
          localFilePath,
          {
            resource_type: resourceType,
            folder: resourceType === 'video' ? 'videos' : 'images',
            quality: 'auto',
            fetch_format: 'auto',
          },
          (error, result) => {
            if (error || !result) reject(error)
            else resolve(result)
          }
        )
      })

      // Cleanup local file after successful upload
      fs.unlinkSync(localFilePath)
      return result.secure_url

    } catch (error: any) {
      attempt++
      if (attempt === maxRetries) {
        // Cleanup local file on final failure
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath)
        }
        throw new AppError(500, `Failed to upload file after ${maxRetries} attempts: ${error.message}`)
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)))
    }
  }

  throw new AppError(500, 'Upload failed')
}

// Helper function to remove temp files
const cleanupTempFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

export { upload, uploadToCloudinary, cleanupTempFile }
