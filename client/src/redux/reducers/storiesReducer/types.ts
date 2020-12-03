import {
  FETCH_STORY,
  FETCH_COMMENTS,
  FETCH_NESTED_COMMENTS,
  FETCH_STORIES,
  CLEAR_STORY,
  IS_LOADED_COMMENTS,
  IS_LOADED_STORY,
} from './storiesReducer'
import { IItemStory, StoriesType, CommentsType } from '../../../api/types'
import { BaseThunkType } from '../../createStore'

export type StateType = {
  stories: StoriesType
  story: IItemStory | undefined
  comments: CommentsType
  isLoadedStories: boolean
  isLoadedComments: boolean
}

export type PayloadAllComType = {
  id: number
  comments: CommentsType
}

type setStoryType = {
  type: typeof FETCH_STORY
  payload: IItemStory
}

type setCommentsType = {
  type: typeof FETCH_COMMENTS
  payload: CommentsType
}

type setNestedCommentsType = {
  type: typeof FETCH_NESTED_COMMENTS
  payload: PayloadAllComType
}

type setStoriesType = {
  type: typeof FETCH_STORIES
  payload: StoriesType
}

type setLoadedCommentsType = {
  type: typeof IS_LOADED_COMMENTS
  payload: boolean
}

type setLoadedStoryType = {
  type: typeof IS_LOADED_STORY
  payload: boolean
}

type clearStoryType = {
  type: typeof CLEAR_STORY
}

export type ActionTypes =
  | setStoryType
  | setCommentsType
  | setNestedCommentsType
  | setStoriesType
  | setLoadedCommentsType
  | setLoadedStoryType
  | clearStoryType

export type ThunkType = BaseThunkType<ActionTypes>
