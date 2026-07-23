import { StyleSheet, View } from 'react-native';

import { pawlyTokens } from '@/theme/pawlyTokens';

type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <View
      accessibilityLabel={`Onboarding step ${currentStep} of ${totalSteps}`}
      accessibilityRole="progressbar"
      style={styles.progress}
    >
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map(
        (step) => (
          <View
            key={step}
            style={
              step === currentStep ? styles.activeStep : styles.inactiveStep
            }
          />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: pawlyTokens.color.progressActive,
  },
  inactiveStep: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: pawlyTokens.color.progressInactive,
  },
});
