/* eslint-disable @typescript-eslint/no-explicit-any */
// import multer from 'multer'
// import path from 'path'
// import { v2 as cloudinary } from 'cloudinary'
// import config from '../config'

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, './uploads')
//   },
//   filename(req, file, callback) {
//     const ext = path.extname(file.originalname)
//     const fileName =
//       file.originalname.replace(ext, ' ').split(' ').join('-').toLowerCase() +
//       '-' +
//       Date.now()
//     callback(null, fileName + ext)
//     // console.log(file)
//   },
// })

// const upload = multer({ storage: storage })

// export default upload

// cloudinary.config({
//   cloud_name: config.CLOUD_NAME,
//   api_key: config.CLOUDINARY_API_KEY,
//   api_secret: config.CLOUDINARY_API_SECRET,
// })

// export const cloudinaryImage = (image: string, path: string) => {
//   return new Promise((resolve, rejects) => {
//     cloudinary.uploader.upload(
//       path,
//       { public_id: image.trim() },
//       (error, result) => {
//         if (error) {
//           rejects(error)
//         }
//         resolve(result)
//       }
//     )
//   })
// }

import multer, { StorageEngine } from 'multer'
import path from 'path'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import fs from 'fs'
import config from '../config'

// Cloudinary Config
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
})

// Multer Storage (Local Upload)
const storage: StorageEngine = multer.diskStorage({
  destination(req, file, callback) {
    const uploadPath = './uploads'
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    callback(null, uploadPath)
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname)
    const fileName =
      file.originalname.replace(ext, ' ').split(' ').join('-').toLowerCase() +
      '-' +
      Date.now()
    callback(null, fileName + ext)
  },
})

// Multer Middleware (Multiple Files)
const upload = multer({
  storage,
}).fields([
  { name: 'image', maxCount: 1 }, // Single image file
  { name: 'video', maxCount: 1 }, // Single video file
])

// Cloudinary Upload Utility
const uploadToCloudinary = (
  localFilePath: string,
  resourceType: 'image' | 'video'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: resourceType,
        folder: resourceType === 'video' ? 'videos' : 'images',
      },
      (error: any, result?: UploadApiResponse) => {
        if (error || !result) {
          reject(error)
        } else {
          // Local File Delete After Upload
          fs.unlinkSync(localFilePath)
          resolve(result.secure_url)
        }
      }
    )
  })
}

export { upload, uploadToCloudinary }
