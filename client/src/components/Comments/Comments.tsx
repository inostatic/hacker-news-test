import React, { useState, useEffect } from 'react'
import moment from 'moment'
import user from '../../assets/icons/user.svg'
import { KidsType, CommentsType } from '../../api/types'

export type CommentsProps = {
  by: string
  text: string
  time: number
  kids?: KidsType
  HandleMoreComments: (kids: KidsType, id: number) => void
  id: number
  comments?: CommentsType | undefined
  nestingLevel: number
}

export const Comments: React.FC<CommentsProps> = ({
  by,
  text,
  time,
  kids,
  HandleMoreComments,
  id,
  comments = undefined,
  nestingLevel,
}) => {
  const INDENT = 50
  const [up, down] = ['Close', 'More']
  const [children, setChildren] = useState<CommentsType>([])
  const [btnName, setBtnName] = useState(down)
  const [toggle, setToggle] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (comments) {
      comments.forEach((comment, i) => {
        if (comment.parent === id) {
          setChildren((prev) => [...prev, comment])
        }
      })
      setDisabled(false)
    } else {
      setChildren([])
      setToggle(false)
      setBtnName(down)
    }
  }, [comments, down, id])

  const getAllComments = () => {
    if (!comments) {
      if (kids) {
        setDisabled(true)
        HandleMoreComments(kids, id)
        setBtnName(up)
        setToggle(true)
      }
    } else {
      setToggle(!toggle)
      btnName === down ? setBtnName(up) : setBtnName(down)
    }
  }

  return (
    <>
      {by && (
        <li
          className="comments__item"
          style={{ marginLeft: `${INDENT * nestingLevel}px` }}
        >
          <div className="comments__item-head">
            <img src={user} alt="#" />
            <div className="comments__author">{by}</div>
            <div className="comments__date">
              {moment(time * 1000).format('LLLL')}
            </div>
          </div>
          <div
            className="comments__text"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          {kids && !nestingLevel && (
            <button
              className={`comments__open-child ${
                disabled ? 'comments__open-child_disabled' : ''
              }`}
              disabled={disabled}
              onClick={getAllComments}
            >
              {btnName}
            </button>
          )}
        </li>
      )}

      {children && (
        <ul
          className={`comments__children ${
            !toggle && !nestingLevel ? 'comments__children_none' : ''
          }`}
        >
          {children.map((comment) => (
            <Comments
              key={comment.id}
              HandleMoreComments={HandleMoreComments}
              nestingLevel={nestingLevel + 1}
              comments={comments}
              {...comment}
            />
          ))}
        </ul>
      )}
    </>
  )
}
