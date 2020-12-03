import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import reload from '../../assets/icons/reload.svg'

describe('Button', () => {
  it('render Button component', () => {
    const { getByRole } = render(<Button src={reload} />)
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('img')).toBeInTheDocument()
  })
  it('render disabled Button component', () => {
    const { getByRole } = render(<Button src={reload} disabled={true} />)
    expect(getByRole('button')).toHaveAttribute('disabled')
    expect(getByRole('button')).toHaveClass('btn_disabled')
  })
  it('render Button component with an additional class', () => {
    const { getByRole } = render(<Button src={reload} styles={'btn_refresh'} />)
    expect(getByRole('button')).toHaveClass('btn_refresh')
  })
  it('render Button component onclick', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<Button src={reload} onClick={onClick} />)
    const button = getByRole('button')
    userEvent.click(button)
    expect(onClick).toBeCalled()
  })
})
