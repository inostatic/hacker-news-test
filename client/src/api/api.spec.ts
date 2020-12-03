import { request } from './api'
import { IItemComment, IItemStory } from './types'

(fetch as jest.Mock) = jest.fn(() => new Promise((resolve) => resolve(void 0)))

describe('API', () => {
  let story: IItemStory
  let arrayStories: Array<IItemStory>
  let comments: Array<IItemComment>
  beforeEach(() => {
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
    story = {
      by: 'dhouston',
      descendants: 71,
      id: 8863,
      kids: [8952, 9224, 8917, 8884, 8887, 8943, 8869],
      score: 111,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    }
    arrayStories = [story, story, story]
  })
  it('Should return story', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          ...story,
        })
      )
    )

    const result = await request('/api/stories/444444')
    expect(result).toEqual(story)
  })
  it('Should return array stories', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify([...arrayStories]))
    )

    const result = await request('/api/stories')
    expect(result).toEqual(arrayStories)
  })
  it('Should return array comments', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify([...comments]))
    )

    const result = await request('/api/comments')
    expect(result).toEqual(comments)
  })
  it('Should return array nested comments', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify([...comments]))
    )

    const result = await request('/api/comments/more')
    expect(result).toEqual(comments)
  })
})
