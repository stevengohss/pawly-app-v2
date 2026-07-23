import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AccessibilityInfo,
  BackHandler,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PageHeader } from '@/components/navigation/PageHeader';
import { IntroFooter } from '@/features/onboarding/intro/components/IntroFooter';
import { IntroHero } from '@/features/onboarding/intro/components/IntroHero';
import {
  introStepIndex,
  introSteps,
  type IntroOnboardingStep,
} from '@/features/onboarding/intro/introSteps';
import { useIntroOnboardingPersistence } from '@/features/onboarding/intro/state/useIntroOnboardingPersistence';
import { pawlyTokens } from '@/theme/pawlyTokens';
import type { IntroStep } from '@/types/launch.types';

type IntroOnboardingScreenProps = {
  initialStep: IntroStep;
};

export function IntroOnboardingScreen({
  initialStep,
}: IntroOnboardingScreenProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const safeTop =
    Platform.OS === 'web' ? pawlyTokens.screen.safeTop : insets.top;
  const pageHeight = Math.max(0, height - safeTop - 56);
  const listRef = useRef<FlatList<IntroOnboardingStep>>(null);
  const programmaticSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const initialIndex = introStepIndex[initialStep];
  const currentIndexRef = useRef(initialIndex);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [footerHeight, setFooterHeight] = useState<number>(
    pawlyTokens.screen.footerHeight,
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const { finishIntro, persistStep } = useIntroOnboardingPersistence();

  const settleAtIndex = useCallback(
    (index: number) => {
      if (programmaticSettleTimer.current) {
        clearTimeout(programmaticSettleTimer.current);
        programmaticSettleTimer.current = null;
      }

      const boundedIndex = Math.max(
        0,
        Math.min(introSteps.length - 1, index),
      );
      const destination = introSteps[boundedIndex];

      if (boundedIndex === currentIndexRef.current) {
        return;
      }

      currentIndexRef.current = boundedIndex;
      setCurrentIndex(boundedIndex);
      router.setParams({ step: destination.id });
      void persistStep(destination.id);
    },
    [persistStep, router],
  );

  const transitionTo = useCallback(
    async (index: number) => {
      const boundedIndex = Math.max(
        0,
        Math.min(introSteps.length - 1, index),
      );
      const destination = introSteps[boundedIndex];

      if (boundedIndex === currentIndexRef.current) {
        return;
      }

      await persistStep(destination.id);
      listRef.current?.scrollToIndex({
        animated: !reduceMotion,
        index: boundedIndex,
      });

      if (reduceMotion) {
        settleAtIndex(boundedIndex);
        return;
      }

      programmaticSettleTimer.current = setTimeout(
        () => settleAtIndex(boundedIndex),
        280,
      );
    },
    [persistStep, reduceMotion, settleAtIndex],
  );

  useEffect(() => {
    void persistStep(initialStep);
  }, [initialStep, persistStep]);

  useEffect(() => {
    let mounted = true;

    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) {
        setReduceMotion(enabled);
      }
    });

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    );

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(
    () => () => {
      if (programmaticSettleTimer.current) {
        clearTimeout(programmaticSettleTimer.current);
      }
    },
    [],
  );

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (currentIndexRef.current === 0) {
          return false;
        }

        void transitionTo(currentIndexRef.current - 1);
        return true;
      },
    );

    return () => subscription.remove();
  }, [transitionTo]);

  const handleSettledScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      settleAtIndex(index);
    },
    [settleAtIndex, width],
  );

  const handlePagerScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const pagePosition = event.nativeEvent.contentOffset.x / width;
      const nearestIndex = Math.round(pagePosition);

      if (Math.abs(pagePosition - nearestIndex) <= 0.02) {
        settleAtIndex(nearestIndex);
      }
    },
    [settleAtIndex, width],
  );

  const handleFooterLayout = useCallback((event: LayoutChangeEvent) => {
    const measuredHeight = Math.ceil(event.nativeEvent.layout.height);
    setFooterHeight((current) =>
      current === measuredHeight ? current : measuredHeight,
    );
  }, []);

  const handleContinue = useCallback(() => {
    if (currentIndexRef.current < introSteps.length - 1) {
      void transitionTo(currentIndexRef.current + 1);
      return;
    }

    void finishIntro(introSteps[currentIndexRef.current].id);
  }, [finishIntro, transitionTo]);

  const handleSkip = useCallback(() => {
    void finishIntro(introSteps[currentIndexRef.current].id);
  }, [finishIntro]);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={pawlyTokens.color.page} style="dark" />

      <View style={[styles.headerArea, { paddingTop: safeTop }]}>
        <PageHeader
          appName="Pawly"
          backAccessibilityLabel="Go back"
          onBack={
            currentIndex > 0
              ? () => void transitionTo(currentIndex - 1)
              : undefined
          }
          rightAction={
            currentIndex < introSteps.length - 1 ? (
              <Pressable
                accessibilityLabel="Skip introductory onboarding"
                accessibilityRole="button"
                hitSlop={6}
                onPress={handleSkip}
                style={({ pressed }) => [
                  styles.skipButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.skip}>Skip</Text>
              </Pressable>
            ) : null
          }
        />
      </View>

      <FlatList
        contentContainerStyle={styles.pagerContent}
        data={introSteps}
        decelerationRate="fast"
        directionalLockEnabled
        disableIntervalMomentum
        getItemLayout={(_, index) => ({
          index,
          length: width,
          offset: width * index,
        })}
        horizontal
        initialScrollIndex={initialIndex}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleSettledScroll}
        onScroll={handlePagerScroll}
        pagingEnabled
        ref={listRef}
        renderItem={({ item }) => (
          <IntroHero
            footerHeight={footerHeight}
            pageHeight={pageHeight}
            pageWidth={width}
            step={item}
          />
        )}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.pager}
      />

      <IntroFooter
        bottomInset={insets.bottom}
        onContinue={handleContinue}
        onLayout={handleFooterLayout}
        step={(currentIndex + 1) as 1 | 2 | 3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: pawlyTokens.color.page,
  },
  headerArea: {
    position: 'relative',
    zIndex: 3,
    backgroundColor: pawlyTokens.color.page,
  },
  pager: {
    zIndex: 0,
    flex: 1,
  },
  pagerContent: {
    height: '100%',
  },
  skip: {
    color: pawlyTokens.color.link,
    fontFamily: pawlyTokens.font.jakartaSemiBold,
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
