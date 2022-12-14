import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native'
import Text from './text'
import theme from '../theme';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.backgroundColors.transparentDark,
  },
  flexItemA: {
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 15,
    flexGrow: 0,
  },
});

// Tabs for AppBar
const Tab = ({ link, text, show }) => {
  
  if (!show) {
    return null
  }

  return (
    <Link to={link} style={styles.flexItemA}>
      <Text fontWeight="bold" fontSize="subheading" color='white'>{text}</Text>
    </Link>
  )
}

const AppBar = () => {
  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network'
  })
  let user
  
  if (data && data.me) {
    user = data.me.username
  } else {
    user = null
  }

  return <View style={styles.container}>
            <ScrollView horizontal>
                <Tab link={'/'} text='Repositories' show='true' />
                <Tab link={'/createReview'} text='Create a review' show={user} />
                <Tab link={'/signin'} text='Sign In' show={!user} />
                <Tab link={'/myreviews'} text='My reviews' show={user} />
                <Tab link={'/signout'} text='Sign Out' show={user} />
                <Tab link={'/signup'} text='Sign Up' show={!user} />
            </ScrollView>
        </View>;
};

export default AppBar;