import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./text";
import theme from "../theme";

console.log(theme.width.width)

const styles = StyleSheet.create({
    container: {
        margin: 15,
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
    }


})

const RepositoryItem = ({ fullName, desc, lang, forks, stars, ratingAvg, reviewCount, ownerAvatarUrl }) => {
    // star and fork value displayed in thousands if larger than 1000
    const getStarValue = () => {
        if (stars >= 1000) {
            return `${(stars / 1000).toFixed(1)}k`
        } else {
            return `${stars}`
        }
    }

    const getForkvalue = () => {
        if (forks >= 1000) {
            return `${(forks / 1000).toFixed(1)}k`
        } else {
            return `${forks}`
        }
    }

    return (
        <View style={styles.container}>
            <View style={theme.flexContainerRow}>
                <View style={styles.picMargin}>
                    <Image style={theme.images.profilePicture} source={{ uri: ownerAvatarUrl}}/>
                </View>
                <View style={styles.infoContainer}>
                    <Text fontWeight="bold" fontSize="subheading" style={styles.infoMargin}>{fullName}</Text>
                    <Text color="textSecondary" style={styles.infoMargin}>{desc}</Text>
                    <Text color="white" style={styles.langugage}>{lang}</Text>
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
                    <Text fontWeight="bold">{reviewCount}</Text>
                    <Text color="textSecondary">Reviews</Text>
                </View>
                <View style={theme.flexContainerCenter}>
                    <Text fontWeight="bold">{ratingAvg}</Text>
                    <Text color="textSecondary">Rating</Text>
                </View>                                
            </View>
        </View>
    )
}

export default RepositoryItem
