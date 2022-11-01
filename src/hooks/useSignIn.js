import { useMutation } from "@apollo/client"
import { LOGIN } from '../graphql/mutations'

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error, 'error')
        }
    });

    const signIn = async ({ username, password }) => {
        if (username && password) {
            return mutate({ variables: { credentials: { username, password } }})
        } else {
            console.log('missing username / password ')
        }
    }

    return [signIn, result]
}

export default useSignIn