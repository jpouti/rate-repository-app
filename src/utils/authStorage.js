import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace
    }

    // Get access token from the storage
    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:accessToken`,
        )
        return accessToken ? JSON.parse(accessToken) : []
    }

    // Add access token to the storage
    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:accessToken`,
            JSON.stringify(accessToken)
        )
    }

    // Remove the access token from the storage
    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
    }
}

export default AuthStorage