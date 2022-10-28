//import { useState, useEffect } from "react";
import { View } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
    const result = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    })

    if (result.loading) {
        return <View>loading...</View>
    }
    
    const repositories = result.data.repositories

    return { repositories }
}

export default useRepositories