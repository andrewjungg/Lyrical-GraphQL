import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'

import './style/style.css'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
  // associates the object id with react component
  // and lets react know to rerender if it has anything with that id
  // this can be avoided by just using `refetchQueries` attribute after a mutation
  // but this means multiple requests, whereas this method is only one request
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
          <Route path='songs/new' component={SongCreate} />
          <Route path='songs/:id' component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
