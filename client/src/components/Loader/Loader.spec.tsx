import React from 'react'
import { render, screen } from '@testing-library/react'
import { Loader } from './Loader'

describe('Loader', () => {
  it('Should return loader', () => {
    const { getByRole } = render(<Loader disabled={false} color={'red'} />)
    const src = getByRole('img').getAttribute('src')
    expect(src).toBe('reload.svg')
  })
  it('Should not return loader', () => {
    const { getByTestId } = render(<Loader disabled={true} color={'red'} />)
    expect(getByTestId(true).classList[1]).toBe('loader_none')
  })
})
