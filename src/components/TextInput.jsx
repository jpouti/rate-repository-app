import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({});

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  // display error related container as red
  if (error) {
    textInputStyle[0] = {
      ...textInputStyle[0],
      borderColor: '#d73a4a',
    }
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;