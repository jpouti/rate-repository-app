import { useQuery } from "@apollo/client"
import { View } from "react-native"
import { GET_ME } from "../graphql/queries"

const useUser = (variables) => {
    const { data, loading } = useQuery(GET_ME, {
        variables,
        fetchPolicy: 'cache-and-network',
    })

    if (loading) return <View>Loading..</View>

    const reviews = data.me.reviews

    return { reviews }
}

export default useUser