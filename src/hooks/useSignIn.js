import { useApolloClient, useMutation } from "@apollo/client"
import { LOGIN } from '../graphql/mutations'
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const [mutate, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error, 'error')
        }
    });

    const signIn = async ({ username, password }) => {
        if (username && password) {
            const { data } = await mutate({ variables: { credentials: { username, password } }})
            await authStorage.setAccessToken(data.authenticate.accessToken)
            apolloClient.resetStore()
            return data
        } else {
            console.log('missing username / password ')
        }
    }

    return [signIn, result]
}

export default useSignIn