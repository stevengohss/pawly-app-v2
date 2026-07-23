import { StyleSheet, View } from 'react-native';

import ArrowChevron from '../../../assets/figma/stage1/forward-arrow-chevron.svg';
import ArrowLine from '../../../assets/figma/stage1/forward-arrow-line.svg';

export function ForwardArrow() {
  return (
    <View accessibilityElementsHidden style={styles.container}>
      <ArrowLine height={1.5} style={styles.line} width={14.083} />
      <ArrowChevron height={11.5} style={styles.chevron} width={6.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
  },
  line: {
    position: 'absolute',
    left: 2.583,
    top: 9.25,
  },
  chevron: {
    position: 'absolute',
    left: 11.667,
    top: 4.25,
  },
});
