import { View } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (variables) => {
    const { loading, data, error, fetchMore, ...result } = useQuery(GET_REVIEWS, {
        variables,
        fetchPolicy: 'cache-and-network',
    })

    if (error) return <View>Error, {error}</View>
    if (loading) return <View>Loading..</View>

    const handleFetchMore = () => {
        const canFetchMore = !loading && data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ]
                        }
                    }
                }
            }
        })
    }

    return {
        reviews: data.repository.reviews,
        fetchMore: handleFetchMore,
        loading,
        ...result
    }
}

export default useReviews;
