import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  inputText: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'lightgray',
    fontSize: theme.fontSizes.signInput,
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style ={styles.inputText}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;