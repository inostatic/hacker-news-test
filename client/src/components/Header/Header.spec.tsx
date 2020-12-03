import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('render Header component', () => {
    const { getByRole } = render(<Header />)
    expect(getByRole('banner')).toBeInTheDocument()
    expect(getByRole('banner')).toHaveClass('header')
    expect(getByRole('heading')).toBeInTheDocument()
    expect(getByRole('heading')).toHaveClass('header__title')
  })
})
