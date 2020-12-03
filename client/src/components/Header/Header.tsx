import React from 'react'

export const Header: React.FC = React.memo(() => {
  return (
    <header id="up" className="header">
      <div className="header__content  container">
        <h3 className="header__title">Hacker News</h3>
      </div>
    </header>
  )
})
