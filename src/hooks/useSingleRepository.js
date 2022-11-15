import { useQuery } from "@apollo/client";
import { View } from "react-native";

import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (id) => {
    const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, {
        variables: { id: id },
        fetchPolicy: 'cache-and-network',
    })

    if (loading) {
        return <View>loading</View>
    } 
    if (error) return <View>error {error}</View>

    const repository = data.repository
    return repository
}

export default useSingleRepository