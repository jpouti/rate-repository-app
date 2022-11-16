import { useApolloClient, useMutation } from "@apollo/client"
import { CREATE_USER } from '../graphql/mutations'

const useSignUp = () => {
    const apolloClient = useApolloClient()
    const [mutate, result] = useMutation(CREATE_USER, {
        onError: (error) => {
            console.log(error)
        }
    })

    const signUp = async ({ username, password }) => {
        const { data } = await mutate({ variables: { user: { username, password } } })
        apolloClient.resetStore()
        return data
    }

    return [signUp, result]
}

export default useSignUp