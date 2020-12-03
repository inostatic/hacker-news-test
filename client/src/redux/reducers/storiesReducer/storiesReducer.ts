import { ActionTypes, StateType } from './types'

export const FETCH_STORIES = 'FETCH_STORIES'
export const FETCH_STORY = 'FETCH_STORY'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const FETCH_NESTED_COMMENTS = 'FETCH_NESTED_COMMENTS'
export const IS_LOADED_STORY = 'IS_LOADED_STORY'
export const IS_LOADED_COMMENTS = 'IS_LOADED_COMMENTS'
export const CLEAR_STORY = 'CLEAR_STORY'

const defaultState: StateType = {
  stories: [],
  story: undefined,
  comments: [],
  isLoadedStories: false,
  isLoadedComments: false,
}

export const storiesReducer = (state = defaultState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_STORIES:
      return {
        ...state,
        stories: action.payload,
      }
    case FETCH_STORY:
      return {
        ...state,
        story: action.payload,
      }
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }
    case FETCH_NESTED_COMMENTS:
      const comments = state.comments
      const position = comments.findIndex((e) => e.id === action.payload.id)
      comments[position]['comments'] = action.payload.comments
      return {
        ...state,
        comments: comments,
      }
    case IS_LOADED_STORY:
      return {
        ...state,
        isLoadedStories: action.payload,
      }
    case IS_LOADED_COMMENTS:
      return {
        ...state,
        isLoadedComments: action.payload,
      }
    case CLEAR_STORY:
      return {
        ...state,
        story: undefined,
        comments: []
      }
    default:
      return state
  }
}
