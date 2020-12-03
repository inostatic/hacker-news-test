import React, { useCallback, useEffect } from 'react'
import refresh from '../assets/icons/reload.svg'
import back from '../assets/icons/reply.svg'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { Comments } from '../components/Comments/Comments'
import { Story } from '../components/Story/Story'
import { Button } from '../components/Button/Button'
import { Loader } from '../components/Loader/Loader'
import {
  clearStoryAc,
  getStory,
  getNestedComments,
} from '../redux/reducers/storiesReducer/action'

import { KidsType } from '../api/types'
import { AppState } from '../redux/createStore'

export const StoryPage: React.FC = () => {
  const dispatch = useDispatch()
  const { story, comments, isLoadedComments } = useSelector(
    (state: AppState) => state.storiesReducer
  )
  const params = useParams<{ id: string }>()
  const id = +params.id

  useEffect(() => {
    const timerID = setInterval(() => {
      dispatch(getStory(id))
    }, 60000)
    return () => {
      clearInterval(timerID)
      dispatch(clearStoryAc())
    }
  }, [id, dispatch])

  useEffect(() => {
    dispatch(getStory(id))
  }, [id, dispatch])

  const HandleMoreComments = useCallback(
    (kids: KidsType, id: number) => {
      if (kids) dispatch(getNestedComments(kids, id))
    },
    [dispatch]
  )

  const HandleUpdateComments = useCallback(() => {
    dispatch(getStory(id))
  }, [id, dispatch])

  return (
    <main className="story">
      <nav className="story__navbar">
        <Link to="/">
          <Button src={back} />
        </Link>
        {!story && <Loader disabled={false} color={'white'} />}
      </nav>
      {story && (
        <section className="story__container">
          <Story {...story} />
          <article className="comments">
            <div className="comments__head">
              <div className="comments__head-left">
                <div className="comments__title">Comments</div>
                <div className="comments__counts">
                  {story ? story.descendants : '0'}
                </div>
              </div>
              <div className="comments__head-right">
                <Loader disabled={!isLoadedComments} color={'red'} />
                <Button
                  src={refresh}
                  styles={'btn_refresh'}
                  onClick={HandleUpdateComments}
                  disabled={isLoadedComments}
                />
              </div>
            </div>
            <ul className="comments__list">
              {comments &&
                comments.map((comment) => (
                  <Comments
                    key={comment.id}
                    HandleMoreComments={HandleMoreComments}
                    nestingLevel={0}
                    {...comment}
                  />
                ))}
            </ul>
          </article>
        </section>
      )}
    </main>
  )
}
