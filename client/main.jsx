import { render } from 'preact'
import { Provider } from '@urql/preact'
import { client } from './infrastructure/graphql/client'
import { AppRouter } from './presentation/router'
import './index.css'

render(
  <Provider value={client}>
    <AppRouter />
  </Provider>,
  document.getElementById('app')
)
