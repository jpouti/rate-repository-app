import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation authenticate($credentials: AuthenticateInput!){
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput!) {
        createReview(review: $review) {
            createdAt
            repositoryId
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($user: CreateUserInput!) {
        createUser(user: $user) {
            username
            createdAt
        }
    }
`