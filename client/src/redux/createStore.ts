import {
  combineReducers,
  compose,
  createStore,
  applyMiddleware,
  Action,
} from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { storiesReducer } from './reducers/storiesReducer/storiesReducer'

const rootReducer = combineReducers({
  storiesReducer,
})

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export type AppState = ReturnType<typeof rootReducer>
export type BaseThunkType<A extends Action, R = void> = ThunkAction<
  R,
  AppState,
  unknown,
  A
>
