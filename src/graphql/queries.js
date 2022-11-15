import { gql } from "@apollo/client";

// query the repositories
export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
              node {
                id
                ownerAvatarUrl
                fullName
                description
                language
                stargazersCount
                forksCount
                reviewCount
                ratingAverage
              }
            }
          }
        }
`;

// query a single repository
export const GET_SINGLE_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url 
    }
  }
`

// query the authenticated user
export const GET_ME = gql`
    query {
      me {
        id
        username
      }
    }
`

// query reviews of single repository
export const GET_REVIEWS = gql`
query repository($id: ID!) {
  repository(id: $id) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
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