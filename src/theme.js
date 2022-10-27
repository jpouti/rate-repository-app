import { Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get('window').width
const halfWidth = windowWidth / 2
const windowHeight = Dimensions.get('window').height

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
      signInput: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
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
    },
    height: {
      height: windowHeight,
    },
    signContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: 'white',
      minHeight: windowHeight * 0.27
    },
    signButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0366d6',
      padding: 10,
      borderRadius: 5,
    }
  };
  
  export default theme;