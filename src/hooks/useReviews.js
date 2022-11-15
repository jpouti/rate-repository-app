import { View } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (id) => {
    const result = useQuery(GET_REVIEWS, {
        variables: { id: id },
        fetchPolicy: 'cache-and-network',
    })

    if (result.loading) {
        return <View>loading...</View>
    } 
    if (result.error) return <View>Error, {result.error}</View>

    const reviews = result.data.repository.reviews
    return { reviews }
}

export default useReviews;
