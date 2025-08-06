import { Platform, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const utility = {
  // returns dimensions of iPhoneX
  getiPhoneX_Dimensions() {
    return { height: 812, width: 375 };
  },
  // returns dimensions of iPhoneXR
  getiPhoneXR_Dimensions() {
    return { height: 896, width: 414 };
  },
  // returns dimensions of iPhone5s and iphoneSE
  getiPhone5s_Dimensions() {
    return { height: 568, width: 320 };
  },
  // returns dimensions of iPhone6 , iPhone6s , iPhone7 , iPhone8
  getiPhone6s_Dimensions() {
    return { height: 667, width: 375 };
  },
  // return dimensions of iphone6_plus , iphone6s_plus , iPhone7_plus , iPhone8_plus
  getiPhone6plus_Dimensions() {
    return { height: 736, width: 414 };
  },

  // for particular screen sizes
  getScreenSize() {
    return { height: deviceHeight, width: deviceWidth };
  },

  // status bar Height
  getStatusBarHeight() {
    if (Platform.OS === "android") {
      return 0;
    }
    if (deviceHeight === utility.getiPhoneX_Dimensions().height) {
      return 44;
    }
    return 20;
  },

  // tab bar Height
  getBottomHeight() {
    if (Platform.OS === "android") {
      return 28;
    }
    if (
      deviceHeight === utility.getiPhoneX_Dimensions().height ||
      deviceHeight === utility.getiPhoneXR_Dimensions().height
    ) {
      return 34;
    }
    return 0;
  },
};

// diffrent styles
export const Metrics = {
  baseMargin: 8,
  doubleBaseMargin: 16,
  basePadding: 24,
  buttonPadding: 10,
  buttonRadius: 4,
  buttonHeight: 56,
  buttonSmallHeight: 32,
  buttonSmallWidth: 96,
  buttonBorderWidth: 0.5,
  gutter: 8,
  horizontalLineHeight: 1,

  icons: {
    tiny: 15,
    small: 24,
    medium: 30,
    large: 48,
    xl: 60,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300,
  },
  marginHorizontal: 10,
  marginVertical: 10,
  navBarHeight: Platform.OS === "ios" ? 60 : 50,
  searchBarHeight: 64,
  tabBarHeight: 50,
  rowHeight: 75,
  screenHeight: deviceHeight,
  screenWidth: deviceWidth,
  bottomNavBarHeight: Dimensions.get("screen").height - deviceHeight,
  section: 24,
  smallMargin: 4,
  inputHeight: 48,
};
