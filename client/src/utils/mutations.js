import { gql } from 'graphql-tag';

export const LOGIN = gql`
mutation login ($email: String!, $password: String!) {
    login(email:$email, password: $password) {
      token 
      user {
        email
      }
    }
  }`;

  export const ADD_USER = gql`
  mutation addUser ($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password){
      token
      user{
        email
      }
    }
  }`;
  export const SAVE_BOOK = gql`
  mutation saveBook ($bookData: bookData!) {
    saveBook(bookData: $bookData) {
      email
      savedBooks {
        
        authors
    description
    title
    image
    link
    bookId
      }
    }
  }`;

  export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      email
      savedBooks {
        authors
    description
    bookId
    image
    link
    title
      }
    }
  }`