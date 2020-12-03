import React from 'react'
import { render } from '@testing-library/react'
import { Comments, CommentsProps } from './Comments'
import { KidsType } from '../../api/types'

const renderComments = () => {
  const commentsItem: CommentsProps = {
    by: 'norvig',
    id: 2921983,
    kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
    text: 'text comments',
    time: 1314211127,
    HandleMoreComments: (kids: KidsType, id: number) => {},
    nestingLevel: 0,
  }
  return render(<Comments {...commentsItem} />)
}

describe('Comments', () => {
  it('Render Comments component', () => {
    const { getByRole } = renderComments()
    expect(getByRole('listitem')).toBeInTheDocument()
    expect(getByRole('img')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('list')).toBeInTheDocument()
  })
  it('Should contains author name', () => {
    const { getByText } = renderComments()
    expect(getByText('norvig')).toBeInTheDocument()
  })
  it('Should contains text comment', () => {
    const { getByText } = renderComments()
    expect(getByText('text comments')).toBeInTheDocument()
  })
  it('Should contains date', () => {
    const { getByText } = renderComments()
    expect(getByText('Wednesday, August 24, 2011 10:38 PM')).toBeInTheDocument()
  })
})
