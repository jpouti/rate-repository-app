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