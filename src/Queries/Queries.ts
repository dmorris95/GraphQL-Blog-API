import { gql } from "urql";

//Get ALL posts
export const GET_POSTS = gql`
    query GetPosts{
        posts {
            data {
             id
             title
             body
             user {
                id
             }
            }
        }
    }
`;

// Get ALL of specific Users Posts
export const GET_USER_POSTS = gql`
    query GetUserPosts($id: ID!){
        user(id: $id) {
            posts {
              data {
                id
                title
                body
                user {
                  id
                }
              }
            }
        }
    }
`;

export const GET_ONE_POST = gql`
    query GetOnePost($id: ID!){
        post(id: $id) {
            title
            body
        }
    }
`;