/* eslint-disable no-undef */
//import { useState, useEffect } from "react";
import { View } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order, search) => {
    let variables = {
        searchKeyword: search,
    }

    // check correct variable based on order 
    if (order === 'latest') {
        variables = {
            ...variables ,
            orderBy: 'CREATED_AT',
            orderDirection: 'ASC',
        }
    } else if (order === 'highest') {
        variables = {
            ...variables ,
            orderBy: 'RATING_AVERAGE',
            orderDirection: 'DESC',
        }
    } else if (order === 'lowest') {
        variables = {
            ...variables ,
            orderBy: 'RATING_AVERAGE',
            orderDirection: 'ASC',
        }
    } else {
        console.log('order not defined')
        return 
    }

    const result = useQuery(GET_REPOSITORIES, {
        variables,
        fetchPolicy: 'cache-and-network',
    })

    if (result.loading) {
        return <View>loading...</View>
    }
    
    const repositories = result.data.repositories

    return { repositories }
}

export default useRepositories