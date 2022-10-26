import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width
const halfWidth = windowWidth / 2

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      white: '#FFFFFF',
    },
    backgroundColors: {
        transparentDark: '#24292e',
        primaryBackground: '#0366d6',
        secondaryBackground: '#586069',
    },
    fontSizes: {
      body: 14,
      subheading: 18,
    },
    fonts: {
      main: 'System',
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    images: {
        profilePicture: {
            width: 50,
            height: 50,
            borderRadius: 10
        },
    },
    flexContainerRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexContainerCenter: {
        display: 'flex',
        alignItems: 'center'
    },
    flexGrow: {
        flexGrow: 1
    },
    width: {
        width: windowWidth,
        halfWidth: halfWidth
    }
  };
  
  export default theme;