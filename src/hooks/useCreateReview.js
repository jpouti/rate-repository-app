import { useMutation, useApolloClient } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"


const useCreateReview = () => {
    const apolloClient = useApolloClient()
    const [mutate, result] = useMutation(CREATE_REVIEW, {
        onError: (error) => {
            console.log(error)
        }
    });

    const createReview = async ({ ownerName, repositoryName, rating, text }) => {
        if (ownerName && repositoryName && rating && text) {
            const { data } = await mutate({ variables: { review: { ownerName, repositoryName, "rating": parseInt(rating), text } } })
            apolloClient.resetStore()
            return data
        } else {
            console.log('missing review input')
        }
    }
    return [createReview, result]
}

export default useCreateReview;