import FormikTextInput from './FormikTextInput';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import Text from './text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
  passwordConf: '',
}

// validation for sign up
const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
    passwordConf: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('Password confirmation is required')
  })


const SignUp = () => {
    const [signUp] = useSignUp()
    const [signIn] = useSignIn()
    let navigate = useNavigate()

    const onSubmit = async (values) => {
        const { username, password } = values
        try {
            // eslint-disable-next-line no-unused-vars
            const data = await signUp({ username, password })
            // eslint-disable-next-line no-unused-vars
            const token = await signIn({ username, password })
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
          </Formik>
        </View>
      )
}

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={theme.signContainer}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
            <FormikTextInput name="passwordConf" placeholder="Password confirmation" secureTextEntry={true} />      
            <Pressable onPress={onSubmit} style={theme.signButton}>
                <Text color="white" fontweight="bold" fontSize="subheading">Sign up</Text>
            </Pressable>
        </View>
    )
}

export default SignUp
