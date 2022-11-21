import { FlatList, View, StyleSheet, Button, Alert } from "react-native"
import { useParams } from "react-router-native"
import { format } from "date-fns"
import { useNavigate } from 'react-router-native';
import useReviews from "../hooks/useReviews"
import useSingleRepository from "../hooks/useSingleRepository"
import RepositoryItem from "./RepositoryItem"
import Text from "./text"
import theme from "../theme"
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: 'lightgrey'
    },
  });

export const ReviewItem = ({ review, myReviews }) => {
    const [deleteReview] = useDeleteReview()
    let navigate = useNavigate()
    let name;
    const time = format(new Date(review.createdAt), 'dd.MM.yyyy')

    // if repositoryName prop is given, display repository name instead of user name
    if (myReviews) {
        name = review.repository.fullName

    } else {
        name = review.user.username
    }

    // navigate to the reviewed repository
    const handleRepositoryPress = () => {
        navigate(`/${review.repository.id}`)
    }

    const handleDeleteReview = () => {
        deleteReview(review.id)
    }

    // creates Alert for deleting a review
    const handleDeleteAlert = () => {
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('deleting review canceled')
                },
                {
                    text: 'Delete',
                    onPress: () => handleDeleteReview()
                }
            ]
        )
    }

    // Buttons to view repository & delete a repository
    const reviewActions = () => {
        return (
            <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 15, gap: 20, backgroundColor: 'white' }}>
                <View style={{ flex: 1, paddingRight: 5 }}>
                    <Button title="View Repository" onPress={handleRepositoryPress}></Button>
                </View>
                <View style={{ flex: 1, paddingLeft: 5 }}>
                    <Button title="Delete review" color="#ff0000" onPress={handleDeleteAlert}></Button>
                </View>
            </View>
        )
    }

    return (
        <>
            <View style={styles.separator} />
            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', padding: 15 }}>
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
            </View>
            {myReviews && reviewActions()}
        </>
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