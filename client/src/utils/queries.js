export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            
        }
    }
}`