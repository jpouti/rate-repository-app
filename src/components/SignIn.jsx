import FormikTextInput from './FormikTextInput';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import Text from './text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
}

// validation for sign in
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})

const SignIn = () => {
  const [signIn] = useSignIn()
  let navigate = useNavigate()
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const data = await signIn({ username, password })
      console.log(data.authenticate.accessToken)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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