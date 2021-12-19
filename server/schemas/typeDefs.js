const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: bookData!): User
        removeBook(bookId: String!): User
    }
    input bookData {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Book {
        _id: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
        bookId: String
    }
    
    type Auth {
        token: ID!
        user: User
    }
    `;

    module.exports = typeDefs