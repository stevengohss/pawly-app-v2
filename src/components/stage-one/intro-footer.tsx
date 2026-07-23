import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import { ForwardArrow } from '@/components/stage-one/forward-arrow';
import { stageOneTokens } from '@/theme/stage-one-tokens';

type IntroFooterProps = {
  bottomInset: number;
  step: 1 | 2 | 3;
  onContinue: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

export function IntroFooter({
  bottomInset,
  step,
  onContinue,
  onLayout,
}: IntroFooterProps) {
  return (
    <View
      onLayout={onLayout}
      style={[styles.footer, { paddingBottom: Math.max(20, bottomInset) }]}
    >
      <View
        accessibilityLabel={`Onboarding step ${step} of 3`}
        accessibilityRole="progressbar"
        style={styles.progress}
      >
        {[1, 2, 3].map((item) => (
          <View
            key={item}
            style={item === step ? styles.activeStep : styles.inactiveStep}
          />
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onContinue}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonLabel}>Get Started</Text>
        <ForwardArrow />
      </Pressable>

      <View style={styles.legal}>
        <Text style={styles.legalText}>By continuing, you agree to our</Text>
        <Text style={styles.legalText}>
          <Text style={styles.legalLink}>Terms of Service </Text>
          and <Text style={styles.legalLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    zIndex: 4,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: stageOneTokens.color.page,
  },
  progress: {
    height: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activeStep: {
    width: 32,
    height: 6,
    borderRadius: 999,
    backgroundColor: stageOneTokens.color.progressActive,
  },
  inactiveStep: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: stageOneTokens.color.progressInactive,
  },
  button: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: stageOneTokens.color.action,
    borderRadius: 999,
    backgroundColor: stageOneTokens.color.action,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  buttonPressed: {
    opacity: 0.84,
  },
  buttonLabel: {
    color: stageOneTokens.color.onAction,
    fontFamily: stageOneTokens.font.jakartaMedium,
    fontSize: 16,
    lineHeight: 20.48,
    letterSpacing: 0.08,
  },
  legal: {
    width: '100%',
    alignItems: 'center',
  },
  legalText: {
    width: '100%',
    color: stageOneTokens.color.heading,
    fontFamily: stageOneTokens.font.jakartaRegular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  legalLink: {
    color: stageOneTokens.color.link,
  },
});
