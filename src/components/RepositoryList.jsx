import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey'
  },
});

export const RepositoryListContainer = ({ repositories }) => {
    // get the nodes from the edges array
    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
}

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <RepositoryItem fullName={item.fullName} desc={item.description} lang={item.language} forks={item.forksCount} stars={item.stargazersCount} ratingAvg={item.ratingAverage} reviewCount={item.reviewCount} ownerAvatarUrl={item.ownerAvatarUrl}/>

const RepositoryList = () => {

  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />

};

export default RepositoryList;