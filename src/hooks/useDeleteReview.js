import { useApolloClient, useMutation } from "@apollo/client"
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
    const apolloClient = useApolloClient()

    const [mutate, result] = useMutation(DELETE_REVIEW, {
        onError: (error) => {
            console.log(error, 'error')
        }
    })

    const deleteReview = async (deleteReviewId) => {
        await mutate({ variables: { deleteReviewId: deleteReviewId } })
        apolloClient.resetStore()
    }

    return [deleteReview, result]
}

export default useDeleteReview