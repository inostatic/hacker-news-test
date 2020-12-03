import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('render App component', () => {
    render(<App />)
    expect(screen.getByText('Hacker News')).toBeInTheDocument()
  })
  it('Should contains div with class header', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('banner')).toHaveClass('header')
  })
  it('Should contains div with class header__title', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('heading')).toHaveClass('header__title')
  })
  it('Should contains div with class table-content', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('list')).toHaveClass('table-content')
  })
  it('Should contains div with class footer', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('contentinfo')).toHaveClass('footer')
  })
  it('Should contains link', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('link')).toBeInTheDocument()
  })
})
