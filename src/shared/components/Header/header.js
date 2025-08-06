import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Body, Left, Right} from 'native-base';
import {Metrics, getHeight} from '../../../utils';

type THeaderProps = {
  container: any,
  body: TElements,
  left: TElements,
  right: TElements,
  bodyStyle: any,
  leftStyle: any,
  rightStyle: any,
};

export const Header = (props: THeaderProps) => {
  const {
    container,
    body,
    left,
    right,
    bodyStyle,
    leftStyle,
    rightStyle,
  } = props;

  return (
    <View style={{...styles.container, ...container}}>
      <View style={styles.headerBody} />
      <View style={styles.headerWrap}>
        {left && <Left style={leftStyle}>{left}</Left>}
        {body && <Body style={bodyStyle}>{body}</Body>}
        {right && <Right style={rightStyle}>{right}</Right>}
      </View>
    </View>
  );
};

// const statusbarHeight = utility.getStatusBarHeight();

const styles = StyleSheet.create({
  container: {
    minHeight: Metrics.navBarHeight,
  },
  headerBody: {
    flex: 1,
  },
  headerWrap: {
    flexDirection: 'row',
    marginBottom: getHeight(8),
  },
});
