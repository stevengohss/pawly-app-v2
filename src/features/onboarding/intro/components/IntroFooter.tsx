import { StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';

import { FooterCTA } from '@/components/layout/FooterCTA';
import { Button } from '@/components/ui/Button';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { pawlyTokens } from '@/theme/pawlyTokens';

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
    <FooterCTA
      bottomInset={bottomInset}
      fixed
      onLayout={onLayout}
    >
      <ProgressIndicator currentStep={step} totalSteps={3} />

      <Button
        label="Get Started"
        onPress={onContinue}
        style={styles.button}
      />

      <View style={styles.legal}>
        <Text style={styles.legalText}>By continuing, you agree to our</Text>
        <Text style={styles.legalText}>
          <Text style={styles.legalLink}>Terms of Service </Text>
          and <Text style={styles.legalLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </FooterCTA>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 46,
  },
  legal: {
    width: '100%',
    alignItems: 'center',
  },
  legalText: {
    width: '100%',
    color: pawlyTokens.color.heading,
    fontFamily: pawlyTokens.font.jakartaRegular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  legalLink: {
    color: pawlyTokens.color.link,
  },
});
