import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('render Footer component', () => {
    const { getByRole } = render(<Footer />)
    expect(getByRole('contentinfo')).toHaveClass('footer')
    expect(getByRole('link')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('button')).toHaveClass('btn btn_footer')
  })
  it('Should contain the text', () => {
    const { getByText } = render(<Footer />)
    expect(getByText(/Hacker News/i)).toBeInTheDocument()
    expect(getByText(/Copyright/i)).toBeInTheDocument()
  })
})
