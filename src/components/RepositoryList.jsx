import * as React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
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


export const RepositoryListContainer = ({ repositories, handlePress, onChangeSearch, onOrderValueChange, order, searchQuery }) => {

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
        onValueChange={onOrderValueChange}
        >
              <Picker.Item label="Latest repositories" value="latest"></Picker.Item>
              <Picker.Item label="Highest rated repositories" value="highest"></Picker.Item>
              <Picker.Item  label="Lowest rated repositories" value="lowest"></Picker.Item>
        </Picker>
    )
  }

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
        // define header component directly in flatlist to prevent creating a new Searchbar component on every render
        ListHeaderComponent={
          <View style={{ padding: 15}}>
            <Searchbar
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={searchQuery}
            />
            <OrderMenu />
          </View>
        }
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
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filter, setFilter] = React.useState('')

  let navigate = useNavigate()
  // handle pressing repositoryItem to navigate a single repository view
  const handlePress = (item) => {
    navigate(`/${item.id}`)
  }

  // change order sort value
  const onOrderValueChange = (item) => {
    setOrder(item)
  }

  // set search query value
  const onChangeSearch = query => {
    setSearchQuery(query)
    onFilterChange(query)
  } 
  // set new searchquery with delay after latest input 
  const onFilterChange = useDebouncedCallback(
    // set search query value
    (filter) => {
      setFilter(filter)
    },
    // delay in ms
    500
  )

  const { repositories } = useRepositories(order, filter)

  return <RepositoryListContainer repositories={repositories} handlePress={handlePress} onOrderValueChange={onOrderValueChange} onChangeSearch={onChangeSearch} order={order} searchQuery={searchQuery} />

};

export default RepositoryList;