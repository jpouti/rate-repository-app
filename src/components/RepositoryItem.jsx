import React from "react";
import { View, Image, StyleSheet, Button } from "react-native";
import Text from "./text";
import theme from "../theme";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white'
    },
    picMargin: {
        marginRight: 15,
    },
    langugage: {
        marginTop: 2.5,
        padding: 5,
        backgroundColor: theme.backgroundColors.primaryBackground,
        borderRadius: 8,
        minWidth: 0
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        minWidth: 0,
        paddingBottom: 10,
        maxWidth: theme.width.width * 0.8,
    },
    infoMargin: {
        paddingBottom: 5,
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingTop: 10
    },
    button: {
        marginTop: 5,
        padding: 2.5,
        borderRadius: 5,
    }


})

// repository Item
const RepositoryItem = ({ item, repBtn }) => {

    // if repBtn prop called (SingleRepository) -> add button to open repository url
    const repositoryButton = () => {
        if (!repBtn) {
            return null
        } else {
            // press opens the repository link
            const onPress = () => {
                Linking.openURL(item.url)
            }
            return (
                <View style={styles.button}>
                    <Button onPress={() => onPress()} title="Open in Github">
                    </Button>
                </View>
            )
        }
    }
    // star and fork value displayed in thousands if larger than 1000
    const getStarValue = () => {
        if (item.stargazersCount >= 1000) {
            return `${(item.stargazersCount / 1000).toFixed(1)}k`
        } else {
            return `${item.stargazersCount}`
        }
    }

    const getForkvalue = () => {
        if (item.forksCount >= 1000) {
            return `${(item.forksCount / 1000).toFixed(1)}k`
        } else {
            return `${item.forksCount}`
        }
    }

    return (
        <View style={styles.container} testID='repositoryItem'>
            <View style={theme.flexContainerRow}>
                <View style={styles.picMargin}>
                    <Image style={theme.images.profilePicture} source={{ uri: item.ownerAvatarUrl}}/>
                </View>
                <View style={styles.infoContainer}>
                    <Text fontWeight="bold" fontSize="subheading" style={styles.infoMargin}>{item.fullName}</Text>
                    <Text color="textSecondary" style={styles.infoMargin}>{item.description}</Text>
                    <Text color="white" style={styles.langugage}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={theme.flexContainerCenter}>
                    <Text fontWeight="bold">{getStarValue()}</Text>
                    <Text color="textSecondary">Stars</Text>
                </View>
                <View style={theme.flexContainerCenter}>
                    <Text fontWeight="bold">{getForkvalue()}</Text>
                    <Text color="textSecondary">Forks</Text>
                </View>
                <View style={theme.flexContainerCenter}>
                    <Text fontWeight="bold">{item.reviewCount}</Text>
                    <Text color="textSecondary">Reviews</Text>
                </View>
                <View style={theme.flexContainerCenter}>
                    <Text fontWeight="bold">{item.ratingAverage}</Text>
                    <Text color="textSecondary">Rating</Text>
                </View>                             
            </View>
            {repositoryButton()}
        </View>
    )
}

export default RepositoryItem
