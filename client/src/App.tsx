import React from 'react'
import './sass/index.scss'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { TablePage } from './pages/TablePage'
import { StoryPage } from './pages/StoryPage'
import { Provider } from 'react-redux'
import { store } from './redux/createStore'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route path="/" exact component={TablePage} />
            <Route path="/story/:id" component={StoryPage} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
