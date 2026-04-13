import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
          language
          forksCount
          description
        }
      }
    }
  }
`

export const SIGN_IN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
}
`
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`