import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { IntroOnboardingStep } from '@/features/onboarding/intro/introSteps';
import { pawlyTokens } from '@/theme/pawlyTokens';

type IntroHeroProps = {
  footerHeight: number;
  pageHeight: number;
  pageWidth: number;
  step: IntroOnboardingStep;
};

export function IntroHero({
  footerHeight,
  pageHeight,
  pageWidth,
  step,
}: IntroHeroProps) {
  const artworkScale = Math.min(1, pageWidth / pawlyTokens.screen.width);
  const contentWidth = Math.min(370, pageWidth - 32);
  const heroFrameWidth = 370 * artworkScale;
  const heroFrameHeight = 350 * artworkScale;
  const defaultOffsetX = (370 - step.heroExportWidth) / 2;
  const defaultOffsetY = (350 - step.heroExportHeight) / 2;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.pageContent,
        { paddingBottom: footerHeight },
      ]}
      directionalLockEnabled
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{ width: pageWidth, height: pageHeight }}
    >
      <View style={styles.pageMain}>
        <View
          style={{
            width: heroFrameWidth,
            height: heroFrameHeight,
          }}
        >
          <Image
            accessibilityElementsHidden
            contentFit="contain"
            source={step.hero}
            style={{
              position: 'absolute',
              width: step.heroExportWidth * artworkScale,
              height: step.heroExportHeight * artworkScale,
              left: (step.heroOffsetX ?? defaultOffsetX) * artworkScale,
              top: (step.heroOffsetY ?? defaultOffsetY) * artworkScale,
            }}
          />
        </View>

        <View style={[styles.copy, { width: contentWidth }]}>
          <Text style={[styles.heading, { maxWidth: step.headingMaxWidth }]}>
            {step.heading}
          </Text>
          <Text style={[styles.body, { maxWidth: step.bodyMaxWidth }]}>
            {step.body}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
  },
  pageMain: {
    flexGrow: 1,
    minHeight: 592,
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  copy: {
    alignItems: 'center',
    gap: 8,
  },
  heading: {
    color: pawlyTokens.color.heading,
    fontFamily: pawlyTokens.font.quicksandSemiBold,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 37.24,
    textAlign: 'center',
  },
  body: {
    color: pawlyTokens.color.body,
    fontFamily: pawlyTokens.font.jakartaRegular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
