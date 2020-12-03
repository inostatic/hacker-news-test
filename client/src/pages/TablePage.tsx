import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import refresh from '../assets/icons/reload.svg'
import { Button } from '../components/Button/Button'
import { Loader } from '../components/Loader/Loader'
import { Item } from '../components/Item/Item'
import { AppState } from '../redux/createStore'
import { getStories } from '../redux/reducers/storiesReducer/action'

export const TablePage: React.FC = () => {
  const dispatch = useDispatch()
  const { stories, isLoadedStories } = useSelector(
    (state: AppState) => state.storiesReducer
  )

  useEffect(() => {
    const timerID = setInterval(() => {
      dispatch(getStories())
    }, 60000)
    return () => {
      clearInterval(timerID)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getStories())
  }, [dispatch])

  const HandleTableUpdate = useCallback(() => {
    dispatch(getStories())
  }, [dispatch])

  return (
    <section className="table">
      <div className="table__navbar">
        <Loader disabled={!isLoadedStories} color={'white'} />
        <Button
          src={refresh}
          disabled={isLoadedStories}
          onClick={HandleTableUpdate}
        />
      </div>
      <ul className="table-content">
        {stories &&
          stories.map((item, i) => <Item key={item.id} {...item} num={++i} />)}
      </ul>
    </section>
  )
}
