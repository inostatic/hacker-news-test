import React from 'react'
import user from '../../assets/icons/user.svg'
import moment from 'moment'

export type StoryProps = {
  by: string
  time: number
  url: string
  title: string
}

export const Story: React.FC<StoryProps> = React.memo(
  ({ by, time, url, title }) => {
    return (
      <article className="story__content">
        <div className="story__header">
          <div className="story__author">
            <img src={user} alt="#" />
            <span>{by}</span>
          </div>
          <div className="story__data">
            {moment(time * 1000).format('LLLL')}
          </div>
        </div>
        <h1 className="story__title">{title}</h1>
        <p className="story__link">
          Link to the original article: <a href={url} target="_blank" rel="noopener noreferrer">{url}/</a>
        </p>
      </article>
    )
  }
)
