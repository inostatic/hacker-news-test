import React from 'react'
import { Button } from '../Button/Button'
import up from '../../assets/icons/up-arrow.svg'

export const Footer: React.FC = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <div>Combinator Hacker News</div>
        <a href="#up">
          <Button src={up} styles={'btn_footer'} />
        </a>
        <div>Copyright (c) 2020</div>
      </div>
    </footer>
  )
})
