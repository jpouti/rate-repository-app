import { gql } from "@apollo/client";

// query the repositories
export const GET_REPOSITORIES = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String){
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
    query getMe($includeReviews: Boolean = false) {
      me {
        id
        username
        reviews @include(if: $includeReviews) {
          edges {
            node {
              id
              text
              rating
              createdAt
              repository {
                fullName
                id
              }
            }
          }
        }
      }
    }
`

// query reviews of single repository
export const GET_REVIEWS = gql`
query SingleRepositoryQuery($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    fullName
    reviews(first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
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
        cursor
      }
    }
  }
}
`