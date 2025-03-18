export type ITeam = {
  name: string
  image: string
}

export interface IPortfolio {
  title: string
  image: string
  team: ITeam[]
  description: string
  keyFeatured: string[]
  liveLink: string
  tags: string[]
  isDeleted?: boolean
}
