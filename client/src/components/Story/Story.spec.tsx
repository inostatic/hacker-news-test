import React from 'react'
import { render, screen } from '@testing-library/react'
import { Story, StoryProps } from './Story'

const renderStory = () => {
  const storyItem: StoryProps = {
    by: 'Name',
    time: 1233321313,
    url: '/localhost:3000/',
    title: 'test story',
  }
  return render(<Story {...storyItem} />)
}

describe('Story', () => {
  it('render Story component', () => {
    const { getByText } = renderStory()
    expect(getByText('Name')).toBeInTheDocument()
    expect(getByText(/test story/i)).toBeInTheDocument()
  })
  it('Should contain attribute href', () => {
    const { getByRole } = renderStory()
    expect(getByRole('link')).toHaveAttribute('href')
  })
  it('Should contain attribute src', () => {
    const { getByRole } = renderStory()
    expect(getByRole('img')).toHaveAttribute('src')
  })
})
