import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey'
  },
});

export const RepositoryListContainer = ({ repositories, handlePress }) => {

    // get the nodes from the edges array
    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

    const renderItem = ({ item }) => {
      return (
        <Pressable onPress={() => handlePress(item)}>
          <RepositoryItem item={item}/>
        </Pressable>
      )
    }

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

const RepositoryList = () => {
  let navigate = useNavigate()
  // handle pressing repositoryItem to navigate a single repository view
  const handlePress = (item) => {
    navigate(`/${item.id}`)
  }

  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} handlePress={handlePress} />

};

export default RepositoryList;