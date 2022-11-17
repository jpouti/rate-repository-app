import * as React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey'
  },
  menuItem: {
    zIndex: 100,
    elevation: 100
  },
});

export const RepositoryListContainer = ({ repositories, handlePress, orderMenu }) => {

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
        ListHeaderComponent={orderMenu}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // sorting order for repositories
  const [order, setOrder] = React.useState('latest')

  let navigate = useNavigate()
  // handle pressing repositoryItem to navigate a single repository view
  const handlePress = (item) => {
    navigate(`/${item.id}`)
  }

  // sorting the order of repositories displayed
const OrderMenu = () => {
  // eslint-disable-next-line no-undef
  const pickerRef = React.useRef()

  // eslint-disable-next-line no-unused-vars
  function open() {
    pickerRef.current.focus()
  }
  // eslint-disable-next-line no-unused-vars
  function close() {
    pickerRef.current.blur()
  }

  return (
      <Picker
      ref={pickerRef}
      selectedValue={order}
      // eslint-disable-next-line no-unused-vars
      onValueChange={(itemValue, itemIndex) =>
        setOrder(itemValue)
      }>
            <Picker.Item label="Latest repositories" value="latest"></Picker.Item>
            <Picker.Item label="Highest rated repositories" value="highest"></Picker.Item>
            <Picker.Item  label="Lowest rated repositories" value="lowest"></Picker.Item>
      </Picker>
  )
}

  const { repositories } = useRepositories(order)

  return <RepositoryListContainer repositories={repositories} handlePress={handlePress} orderMenu={OrderMenu} />

};

export default RepositoryList;