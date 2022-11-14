import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { SignInForm } from '../../components/SignIn'
import { Formik } from 'formik';

describe('SingIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arquments when a valid form is submitted', async () => {
            // render the SingInContainer component, fill the text inputs and press submit button
            const initialValues = {
                username: '',
                password: '',
            }
            const onSubmit = jest.fn()
            const { getByPlaceholderText, getByText } = render(<Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} /> }
                </Formik>)


            fireEvent.changeText(getByPlaceholderText('Username'), 'kalle')
            fireEvent.changeText(getByPlaceholderText('Password'), 'password')
            fireEvent.press(getByText('Sign in'))

            await waitFor(() => {
                // expect the onSubmit function to have been called nce and with a correct first arqument
                expect(onSubmit).toHaveBeenCalledTimes(1)

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                })
            })
        })
    })
})