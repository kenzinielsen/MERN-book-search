import { gql } from 'graphql-tag';


export const GET_ME = gql`
query {
    me{
        _id
    username
    email
    bookCount
    savedBooks{
      authors
        description
        title
        image
      link
      bookId
        }
    }
  }
`;