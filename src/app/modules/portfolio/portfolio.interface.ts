export type ITeam = {
  name: string
  image: string
}

export interface IPortfolio {
  title: string
  image: string
  vedio: string
  description: string
  keyFeatured: string[]
  team: ITeam[]
  techStack: string[]
  tags: string[]
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
