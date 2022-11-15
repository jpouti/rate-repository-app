import { FlatList, View, StyleSheet } from "react-native"
import { useParams } from "react-router-native"
import { format } from "date-fns"
import useReviews from "../hooks/useReviews"
import useSingleRepository from "../hooks/useSingleRepository"
import RepositoryItem from "./RepositoryItem"
import Text from "./text"
import theme from "../theme"

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: 'lightgrey'
    },
  });

const ReviewItem = ({ review }) => {
    const time = format(new Date(review.createdAt), 'dd.MM.yyyy')
    return (
        <><View style={styles.separator} /><View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', padding: 15 }}>
            <View style={{ display: 'flex', justifyContent: 'flex-start', marginRight: 15 }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: 'blue', borderStyle: 'solid', alignSelf: 'stretch' }}>
                    <Text fontWeight="bold" style={{ color: 'blue' }}>{review.rating}</Text>
                </View>
            </View>
            <View>
                <Text fontWeight="bold" style={{ paddingBottom: 3 }}>{review.user.username}</Text>
                <Text color="textSecondary" style={{ paddingBottom: 3 }}>{time}</Text>
                <Text style={{ maxWidth: theme.width.width * 0.75 }}>{review.text}</Text>
            </View>
        </View></>
    )
}

// single repository & reviews about the repository
const SingleRepository = () => {
    let { repositoryId } = useParams()

    const repository = useSingleRepository(repositoryId)
    const { reviews } = useReviews(repositoryId)

    const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : []

    return (
        <FlatList
            ListHeaderComponent={() => <RepositoryItem item={repository} repBtn={true} />}
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} /> }
            keyExtractor={({ id }) => id}
        />
    )
}

export default SingleRepository