import React from 'react'
import load_red from '../../assets/loader/reload.svg'
import load_white from '../../assets/loader/reload-white.svg'

type LoaderProps = {
  disabled: boolean
  color: 'red' | 'white'
}

export const Loader: React.FC<LoaderProps> = ({ disabled, color }) => {
  return (
    <div data-testid className={`loader ${disabled ? 'loader_none' : ''}`}>
      {color === 'red' && <img src={load_red} alt="" />}
      {color === 'white' && <img src={load_white} alt="" />}
    </div>
  )
}
