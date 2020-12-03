export interface IItemStory {
  by: string
  descendants: number
  id: number
  kids?: KidsType
  score: number
  time: number
  title: string
  type: 'story'
  url: string
}

export interface IItemComment {
  by: string
  id: number
  kids?: KidsType
  comments?: CommentsType
  parent: number
  text: string
  time: number
  type: 'comment'
}

export type ItemType = IItemStory | IItemComment
export type ItemsType = Array<ItemType>
export type KidsType = Array<number>
export type CommentsType = Array<IItemComment>
export type StoriesType = Array<IItemStory>

interface IFetch {
  status: number
}

export interface IFetchItems extends IFetch {
  data: KidsType
}

export interface IFetchStory extends IFetch {
  data: IItemStory
}

export interface IFetchComment extends IFetch {
  data: IItemComment
}
export type ItemFetchTypes = IFetchComment | IFetchStory
