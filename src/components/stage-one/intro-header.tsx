import { Pressable, StyleSheet, Text, View } from 'react-native';

import BackArrow from '../../../assets/figma/stage1/back-arrow.svg';
import Wordmark from '../../../assets/figma/stage1/wordmark-vector.svg';
import { stageOneTokens } from '@/theme/stage-one-tokens';

type IntroHeaderProps = {
  canGoBack: boolean;
  canSkip: boolean;
  onBack?: () => void;
  onSkip?: () => void;
};

export function IntroHeader({
  canGoBack,
  canSkip,
  onBack,
  onSkip,
}: IntroHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.sideSlot}>
        {canGoBack ? (
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={6}
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <BackArrow height={13.167} width={6.5} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.center}>
        <Wordmark accessibilityLabel="Pawly" height={40} width={114} />
      </View>

      <View style={[styles.sideSlot, styles.rightSlot]}>
        {canSkip ? (
          <Pressable
            accessibilityLabel="Skip introductory onboarding"
            accessibilityRole="button"
            hitSlop={6}
            onPress={onSkip}
            style={({ pressed }) => [
              styles.skipButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: stageOneTokens.color.page,
  },
  sideSlot: {
    width: 59,
    height: 56,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSlot: {
    alignItems: 'flex-end',
  },
  center: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  backButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: stageOneTokens.color.action,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skip: {
    color: stageOneTokens.color.link,
    fontFamily: stageOneTokens.font.jakartaSemiBold,
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  skipButton: {
    minWidth: 44,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.65,
  },
});
