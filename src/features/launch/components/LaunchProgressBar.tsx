import { Animated, StyleSheet } from 'react-native';

import { pawlyTokens } from '@/theme/pawlyTokens';

type LaunchProgressBarProps = {
  progress: Animated.Value;
};

export function LaunchProgressBar({
  progress,
}: LaunchProgressBarProps) {
  const loaderWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, pawlyTokens.screen.width / 2 - 1],
  });

  return (
    <Animated.View
      accessibilityLabel="Loading Pawly"
      accessibilityRole="progressbar"
      style={styles.loaderTrack}
    >
      <Animated.View style={[styles.loaderFill, { width: loaderWidth }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loaderTrack: {
    width: 200,
    height: 4,
    overflow: 'hidden',
    borderRadius: 48,
    backgroundColor: pawlyTokens.color.loaderTrack,
  },
  loaderFill: {
    height: 4,
    borderRadius: 48,
    backgroundColor: pawlyTokens.color.progressActive,
  },
});
