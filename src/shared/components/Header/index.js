import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, HeaderDropdown} from '../../components';
import {AppIcon, Back, InfoIcon} from '../../../assets/images';
import {Colors} from '../../theme';
import {getHeight} from '../../../utils';

export default props => {
  const {isLeft, onPressLeft, isRight, navigation, isInfo} = props;
  return (
    <Header
      container={styles.headerContainer}
      left={
        isLeft || isInfo ? (
          <TouchableOpacity style={styles.backButtonView} onPress={onPressLeft}>
            <Image
              source={isLeft ? Back : InfoIcon}
              style={isLeft ? styles.backImage : styles.infoImage}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )
      }
      body={
        <Image style={styles.appIcon} source={AppIcon} resizeMode="contain" />
      }
      right={isRight ? <HeaderDropdown navigation={navigation} /> : <View />}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.darkBlue,
  },
  backButtonView: {
    marginLeft: 10,
  },
  backImage: {
    width: getHeight(20),
    height: getHeight(20),
    tintColor: Colors.white,
  },
  appIcon: {
    height: getHeight(30),
    width: getHeight(80),
  },
  infoImage: {
    width: getHeight(22),
    height: getHeight(22),
    tintColor: Colors.white,
  },
});
