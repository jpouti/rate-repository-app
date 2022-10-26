import { View, StyleSheet, Pressable } from 'react-native';
import Text from './text'
import theme from '../theme';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 25,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.transparentDark,
  },
  flexItemA: {
    paddingTop: 40,
    paddingBottom: 25,
    flexGrow: 1,
  },
});

const AppBar = () => {
  return <View style={styles.container}>
            <Pressable style={styles.flexItemA}>
                <Text fontWeight="bold" fontSize="subheading" color='white' style={styles.textOver}>Repositories</Text>
            </Pressable>
        </View>;
};

export default AppBar;