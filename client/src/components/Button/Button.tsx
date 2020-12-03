import React from 'react'

type ButtonProps = {
  src: string
  disabled?: boolean
  styles?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ src, disabled, styles = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${styles} ${disabled ? 'btn_disabled' : ''}`}
      disabled={disabled}
    >
      <img src={src} alt="#" />
    </button>
  )
}
