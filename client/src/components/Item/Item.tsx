import React from 'react'
import star from '../../assets/icons/star.svg'
import { Link } from 'react-router-dom'
import moment from 'moment'

type ItemType = {
  num: number
  by: string
  title: string
  time: number
  score: number
  id: number
  descendants: number
}

export const Item: React.FC<ItemType> = React.memo(
  ({ num, by, title, time, score, id, descendants }) => {
    return (
      <li className="item">
        <div className="item__num">{num}.</div>
        <div className="item__body">
          <Link to={`/story/${id}`}>
            <div className="item__title" data-clear data-testid="link">
              {title}
            </div>
          </Link>
          <div className="item__info">
            <div className="item__author">{by}</div>
            <div className="item__date">
              {moment(time * 1000).format('LLLL')}
            </div>
            <div className="item__count-comments">
              {descendants === 1
                ? `| 1 comment`
                : descendants >= 1
                ? `| ${descendants} comments`
                : ''}
            </div>
          </div>
        </div>
        <div className="item__rating">
          <span>{score}</span>
          <img src={star} alt="#" />
        </div>
      </li>
    )
  }
)
