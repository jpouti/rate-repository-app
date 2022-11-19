
import { FlatList } from "react-native"
import useUser from "../hooks/useUser"

import { ReviewItem } from "./SingleRepository"

const MyReviewContainer = ({ reviews }) => {

    const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : []

    return (
        <FlatList
          data={reviewNodes}
          renderItem={({ item }) => <ReviewItem review={item} repositoryName={item.repository.fullName} /> }
          keyExtractor={({ id }) => id }
        />
    )
}

const MyReviews = () => {
    const variables = {
        includeReviews: true
    }
    const { reviews } = useUser(variables)

    return <MyReviewContainer reviews={reviews} />
}

export default MyReviews