import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SingleRepository from './SingleRepository';
import CreateReview from './ReviewForm';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'lightgrey'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path='/' element={<RepositoryList />} exact/>
            <Route path='/:repositoryId' element={<SingleRepository />} />
            <Route path='/signin' element={<SignIn/>} exact/>
            <Route path='/signout' element={<SignOut/>} exact />
            <Route path='/signup' element={<SignUp />} exact />
            <Route path='/createReview' element={<CreateReview />}exact />
            <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
    </View>
  );
};

export default Main;