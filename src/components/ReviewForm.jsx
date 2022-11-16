import FormikTextInput from './FormikTextInput';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import Text from './text';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
}

// validation for review form
const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .integer('Please input an integer between 0 and 100')
      .min(0, 'Please input an integer between 0 and 100')
      .max(100, 'Please input an integer between 0 and 100')
      .required('Rating is required')
})

const CreateReview = () => {
    const [createReview] = useCreateReview()
    let navigate = useNavigate()

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values
        try {
            const data = await createReview({ ownerName, repositoryName, rating, text })
            const id = data.createReview.repositoryId
            navigate(`/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
    return (
    <View>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
    )
}

const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={theme.signContainer}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="text" placeholder="Review" multiline={true} />
            <Pressable onPress={onSubmit} style={theme.signButton}>
                <Text color="white" fontweight="bold" fontSize="subheading">Create a review</Text>
            </Pressable>
        </View>
    )
}

export default CreateReview;