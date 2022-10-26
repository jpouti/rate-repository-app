import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native'
import Text from './text'
import theme from '../theme';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.backgroundColors.transparentDark,
  },
  flexItemA: {
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexGrow: 0,
  },
});

const AppBar = () => {
  return <View style={styles.container}>
            <Link to="/" style={styles.flexItemA}>
                <Text fontWeight="bold" fontSize="subheading" color='white' style={styles.textOver}>Repositories</Text>
            </Link>
            <Link to="/sign" style={styles.flexItemA}>
                <Text fontWeight="bold" fontSize="subheading" color='white' style={styles.textOver}>Sign In</Text> 
            </Link>
        </View>;
};

export default AppBar;