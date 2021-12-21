//const express = require('express');
////apolloserver
//const { ApolloServer } = require('apollo-server-express');
//const { typeDefs, resolvers } = require('./schemas');
//const path = require('path');
////const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
//
//const db = require('./config/connection');
//const { authMiddlewear } = require('./utils/auth');
//
//const PORT = process.env.PORT || 3001;
//const app = express();
//
//const startServer = async() => {
//  //create a new apollo server and pas in our schmema data
//  const server = new ApolloServer({
//    typeDefs,
//    resolvers,
//    context: authMiddlewear,
// //plugins: [
// //  ApolloServerPluginLandingPageGraphQLPlayground(),
// //  ]
//  });
//  //start server
//  await server.start();
//  //integrate apollo server with express app as middlewear
//  server.applyMiddleware({ app });
//  //log where we can test our gql api
//  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//};
////initializw the apollo server
//startServer();
//
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
//
//// Serve up static assets
//if (process.env.NODE_ENV === 'production') {
//  app.use(express.static(path.join(__dirname, '../client/build')));
//}
//
////app.get('*', (req, res) => {
////  res.sendFile(path.join(__dirname, '../client/build/index.html'));
////});
//
//db.once('open', () => {
//  app.listen(PORT, () => {
//    console.log(`API server running on port ${PORT}!`);
//  });
//});


const express = require('express');
const path = require('path');
//import apollo server
const { ApolloServer } = require('apollo-server-express');
// import typeDefs and resolvers
const { typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');

//db connection
const db = require('./config/connection');

// const routes = require('./routes');

//express server
const app = express();
const PORT = process.env.PORT || 3001;

//apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

//apply apollo server with express app
server.applyMiddleware({ app });

//middleware parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

//get all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});