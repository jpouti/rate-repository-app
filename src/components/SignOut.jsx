import { useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'
import { useEffect } from 'react'

// sign user out
const SignOut = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    let navigate = useNavigate()

    const signOut = async () => {
        await authStorage.removeAccessToken()
        apolloClient.resetStore()
    }
    
    useEffect(() => {
        signOut()
        .then(() => {
            navigate('/', { replace: true }) // return home after sign out
        })
    }, [])

    return (
        <></>
    )
}

export default SignOut