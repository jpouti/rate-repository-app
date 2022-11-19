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

export const ReviewItem = ({ review, repositoryName }) => {
    let name;
    const time = format(new Date(review.createdAt), 'dd.MM.yyyy')

    // if repositoryName prop is given, display repository name instead of user name
    if (repositoryName) {
        name = repositoryName
    } else {
        name = review.user.username
    }
    return (
        <><View style={styles.separator} /><View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', padding: 15 }}>
            <View style={{ display: 'flex', justifyContent: 'flex-start', marginRight: 15 }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: 'blue', borderStyle: 'solid', alignSelf: 'stretch' }}>
                    <Text fontWeight="bold" style={{ color: 'blue' }}>{review.rating}</Text>
                </View>
            </View>
            <View>
                <Text fontWeight="bold" style={{ paddingBottom: 3 }}>{name}</Text>
                <Text color="textSecondary" style={{ paddingBottom: 3 }}>{time}</Text>
                <Text style={{ maxWidth: theme.width.width * 0.75 }}>{review.text}</Text>
            </View>
        </View></>
    )
}

// single repository & reviews about the repository
const SingleRepository = () => {
    let { repositoryId } = useParams()

    const variables = {
        id: repositoryId,
        first: 7,
    }

    const repository = useSingleRepository(repositoryId)
    const { reviews, fetchMore } = useReviews(variables)

    const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : []

    const onEndReach = () => {
        fetchMore()
    }

    return (
        <FlatList
            ListHeaderComponent={<RepositoryItem item={repository} repBtn={true} />}
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} /> }
            keyExtractor={({ id }) => id}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    )
}

export default SingleRepository