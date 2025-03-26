import mongoose from 'mongoose'

export interface IPortfolio {
  title: string
  image: string
  video: string
  description: string
  keyFeatured: string[]
  team: mongoose.Types.ObjectId[]
  techStack: string[]
  tags: string[]
  category: mongoose.Types.ObjectId
  isDeleted?: boolean
}

/* 
Project Name
Project Image
Project vedio
Project Team ( Add new team members dynamically)
Name
Image
Project Description
Project key featured - array
tech Stack - array 
Hash Tag - array 

*/
