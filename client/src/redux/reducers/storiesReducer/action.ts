import {
  FETCH_STORY,
  FETCH_COMMENTS,
  FETCH_NESTED_COMMENTS,
  FETCH_STORIES,
  CLEAR_STORY,
  IS_LOADED_COMMENTS,
  IS_LOADED_STORY,
} from './storiesReducer'
import { request } from '../../../api/api'
import { ActionTypes, ThunkType, PayloadAllComType } from './types'
import {
  CommentsType,
  IItemStory,
  KidsType,
  StoriesType,
} from '../../../api/types'

export const getStories = (): ThunkType => async (dispatch) => {
  try {
    dispatch(setLoadedStoryAc(true))
    const stories = await request('/api/stories')
    if (stories) {
      dispatch(setStoriesAc(stories))
    }
    dispatch(setLoadedStoryAc(false))
  } catch (e) {}
}

export const getStory = (id: number): ThunkType => async (dispatch) => {
  try {
    dispatch(setLoadedStoryAc(true))
    const story = await request(`/api/stories/${id}`)
    if (story) {
      dispatch(setStoryAc(story))
      dispatch(setLoadedStoryAc(false))
      if (story.kids) {
        dispatch(setLoadedCommentsAc(true))
        const comments = await request('/api/comments', 'POST', {
          kids: story.kids,
        })
        if (comments) {
          dispatch(setCommentsAc(comments))
        }
        dispatch(setLoadedCommentsAc(false))
      }
    }
  } catch (e) {}
}

export const getNestedComments = (
  kids: KidsType,
  id: number
): ThunkType => async (dispatch) => {
  try {
    const comments = await request('/api/comments/more', 'POST', { kids: kids })
    if (comments) {
      dispatch(setNestedCommentsAc({ comments, id }))
    }
  } catch (e) {}
}

export const setStoryAc = (payload: IItemStory): ActionTypes => ({
  type: FETCH_STORY,
  payload,
})

export const setCommentsAc = (payload: CommentsType): ActionTypes => ({
  type: FETCH_COMMENTS,
  payload,
})

export const setNestedCommentsAc = (
  payload: PayloadAllComType
): ActionTypes => ({
  type: FETCH_NESTED_COMMENTS,
  payload,
})

export const setStoriesAc = (payload: StoriesType): ActionTypes => ({
  type: FETCH_STORIES,
  payload,
})

export const setLoadedCommentsAc = (payload: boolean): ActionTypes => ({
  type: IS_LOADED_COMMENTS,
  payload,
})

export const setLoadedStoryAc = (payload: boolean): ActionTypes => ({
  type: IS_LOADED_STORY,
  payload,
})

export const clearStoryAc = (): ActionTypes => ({
  type: CLEAR_STORY,
})
