import FormikTextInput from './FormikTextInput';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import Text from './text';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={theme.signContainer}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />      
        <Pressable onPress={onSubmit} style={theme.signButton}>
            <Text color="white" fontweight="bold" fontSize="subheading">Sign in</Text>
        </Pressable>
    </View>
  )
};

export default SignIn;