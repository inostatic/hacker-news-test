import React from 'react'
import { render, screen } from '@testing-library/react'
import { Item } from './Item'
import { BrowserRouter as Router } from 'react-router-dom'

const renderItem = () => {
  const initialState = {
    num: 1,
    by: 'Name',
    title: 'Title header',
    time: 81237123712,
    score: 333,
    id: 293813,
    descendants: 11,
  }
  return render(
    <Router>
      <Item {...initialState} />
    </Router>
  )
}

describe('Item', () => {
  it('render Item component', () => {
    const { getByText } = renderItem()
    expect(getByText('Name')).toBeInTheDocument()
    expect(getByText(/Title header/i)).toBeInTheDocument()
  })
  it('Should contain attribute data-clear', () => {
    const { getAllByTestId } = renderItem()
    expect(getAllByTestId('link')[0]).toHaveAttribute('data-clear')
  })
  it('Should contain attribute href', () => {
    const { getByRole } = renderItem()
    expect(getByRole('link')).toHaveAttribute('href')
  })
  it('Should contain attribute href and correct path', () => {
    const { getByRole } = renderItem()
    const href = getByRole('link').getAttribute('href')
    expect(href).toBe('/story/293813')
  })
})
