import {
  setNestedCommentsAc,
  setCommentsAc,
  setLoadedCommentsAc,
  setLoadedStoryAc,
  setStoriesAc,
  setStoryAc,
  clearStoryAc,
} from './action'
import { storiesReducer } from './storiesReducer'
import { StoriesType, CommentsType } from '../../../api/types'
import { StateType } from './types'

describe('StoriesReducer', () => {
  let defaultState: StateType
  let stories: StoriesType
  let comments: CommentsType
  let preliminaryAction
  let preliminaryState: StateType

  beforeEach(() => {
    defaultState = {
      stories: [],
      story: undefined,
      comments: [],
      isLoadedStories: false,
      isLoadedComments: false,
    }
    stories = [
      {
        by: 'Andrew',
        descendants: 71,
        id: 8833,
        kids: [8952, 9224],
        score: 121,
        time: 1175714200,
        title: 'My YC app: Dropbox - Throw away your USB drive',
        type: 'story',
        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        by: 'name',
        descendants: 71,
        id: 8863,
        score: 111,
        time: 1175714400,
        title: 'My YC app: Dropbox - Throw away your USB drive',
        type: 'story',
        url: 'http://www.getdropbox.com/u/3/screencast.html',
      },
    ]
    comments = [
      {
        by: 'norvig',
        id: 2921983,
        kids: [2922097, 2922429, 2922140, 2922141],
        parent: 2921506,
        text: 'Aw shucks, guys ... you make me blush with your compliments?',
        time: 1314211127,
        type: 'comment',
      },
      {
        by: 'name',
        id: 2924983,
        parent: 2931506,
        text: "I'll keep writing if you keep reading. K?",
        time: 1311211127,
        type: 'comment',
      },
    ]
    preliminaryAction = setCommentsAc(comments)
    preliminaryState = storiesReducer(defaultState, preliminaryAction)
  })

  it('Should fetch stories', () => {
    const action = setStoriesAc(stories)
    const newState = storiesReducer(defaultState, action)
    expect(newState.stories.length).toBe(2)
    expect(newState.stories[0].by).toBe('Andrew')
  })
  it('Should fetch story', () => {
    const action = setStoryAc(stories[0])
    const newState = storiesReducer(defaultState, action)
    if (newState.story) {
      expect(newState.story).toEqual(stories[0])
      expect(newState.story.id).toBe(8833)
    }
  })
  it('Should run stories loader', () => {
    const action = setLoadedStoryAc(true)
    const newState = storiesReducer(defaultState, action)
    expect(newState.isLoadedStories).toBe(true)
  })
  it('Should fetch comments', () => {
    const action = setCommentsAc(comments)
    const newState = storiesReducer(defaultState, action)
    expect(newState.comments.length).toBe(2)
    expect(newState.comments[0].parent).toBe(2921506)
  })
  it('Should fetch nested comments', () => {
    const action = setNestedCommentsAc({ id: 2921983, comments: comments })
    const newState = storiesReducer(preliminaryState, action)
    const nestedComments = newState.comments[0].comments
    if (nestedComments) {
      expect(nestedComments.length).toBe(2)
      expect(nestedComments[1].by).toBe('name')
    }
  })
  it('Should run comments loader', () => {
    const action = setLoadedCommentsAc(true)
    const newState = storiesReducer(defaultState, action)
    expect(newState.isLoadedComments).toBe(true)
  })
  it('Should reset state', () => {
    const action = clearStoryAc()
    const newState = storiesReducer(preliminaryState, action)
    expect(newState.comments.length).toBe(0)
    expect(newState.stories.length).toBe(0)
  })
})
