//import React from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
////import { ApolloProvider } from '@apollo/react-hooks';
//import { ApolloProvider, ApolloClient } from '@apollo/client';
//
//import SearchBooks from './pages/SearchBooks';
//import SavedBooks from './pages/SavedBooks';
//import Navbar from './components/Navbar';
//
//const client = new ApolloClient({
//  // uri: 'http://localhost:3001/graphql'
//  request: operation => {
//    const token = localStorage.getItem('id_token');
//
//    operation.setContext({
//      headers: {
//        authorization: token ? `Bearer ${token}` : ''
//      }
//    })
//  },
// uri: '/graphql'
//);
//
//unction App() {
// return (
//   <ApolloProvider client={client}>
//   <Router>
//     <>
//       <Navbar />
//       <Switch>
//         <Route exact path='/' component={SearchBooks} />
//         <Route exact path='/saved' component={SavedBooks} />
//         <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
//       </Switch>
//     </>
//   </Router>
//    </ApolloProvider>
//  );
//}
//
//export default App;

import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import {setContext} from "@apollo/client/link/context";



const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: '',
    }
  };
});

const client = new ApolloClient(
    {
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    }
);

function App() {
  return (
      <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;