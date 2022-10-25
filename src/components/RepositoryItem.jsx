import React from "react";
import { View, Text } from "react-native";

const RepositoryItem = ({ fullName, desc, lang, forks, stars, ratingAvg, reviewCount }) => {
    return (
        <View>
            <Text>Full name: {fullName}</Text>
            <Text>Description: {desc}</Text>
            <Text>Language: {lang}</Text>
            <Text>Stars: {stars}</Text>
            <Text>Forks: {forks}</Text>
            <Text>Reviews: {reviewCount}</Text>
            <Text>Rating: {ratingAvg}</Text>
        </View>
    )
}

export default RepositoryItem
