import { View } from "react-native"
import { useParams } from "react-router-native"
import useSingleRepository from "../hooks/useSingleRepository"
import RepositoryItem from "./RepositoryItem"

const SingleRepository = () => {
    let { repositoryId } = useParams()

    const repository = useSingleRepository(repositoryId)
    return (
        <View>
            <RepositoryItem item={repository} repBtn={true} />
        </View>
    )
}

export default SingleRepository