import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories (orderBy: $orderBy, orderDirection: $orderDirection){
      edges {
        node {
          id
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

export const REPO_BY_ID = gql`
  query ($id: ID!){
    repository(id: $id) {
      id
      fullName
      ownerAvatarUrl
      stargazersCount
      reviewCount
      ratingAverage
      language
      forksCount
      description
      url
      reviews {
      edges {
          node {
            id
            rating
            text
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repository {
        id
      }
    }
  }

`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`