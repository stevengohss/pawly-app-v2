import { Image, type ImageSource } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AccessibilityInfo,
  BackHandler,
  FlatList,
  Platform,
  ScrollView,
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

import { IntroFooter } from '@/components/stage-one/intro-footer';
import { IntroHeader } from '@/components/stage-one/intro-header';
import { useIntroPersistence } from '@/features/stage-one/use-intro-step';
import type { IntroStep } from '@/lib/launch-state';
import { stageOneTokens } from '@/theme/stage-one-tokens';

const momentsHero = require('../../../assets/figma/stage1/moments-hero.png');
const careHero = require('../../../assets/figma/stage1/care-hero.png');
const exploreHero = require('../../../assets/figma/stage1/explore-hero.png');

type OnboardingStep = {
  body: string;
  bodyMaxWidth: number;
  heading: string;
  headingMaxWidth: number;
  hero: ImageSource;
  heroExportHeight: number;
  heroExportWidth: number;
  heroOffsetX?: number;
  heroOffsetY?: number;
  id: IntroStep;
};

const steps: readonly OnboardingStep[] = [
  {
    id: 'moments',
    heading: 'Preserve every little moment',
    headingMaxWidth: 320,
    body: "From first walks to quiet cuddles, Pawly helps you keep your pet's story beautifully in one place.",
    bodyMaxWidth: 305,
    hero: momentsHero,
    heroExportHeight: 378,
    heroExportWidth: 386,
    heroOffsetX: 0,
    heroOffsetY: 0,
  },
  {
    id: 'care',
    heading: 'Care made easier every day',
    headingMaxWidth: 300,
    body: 'Track check-ins, reminders, meals, health notes, and daily routines without losing the warmth of being a pet parent.',
    bodyMaxWidth: 340,
    hero: careHero,
    heroExportHeight: 510,
    heroExportWidth: 402,
  },
  {
    id: 'explore',
    heading: 'Belong to a kinder pet community',
    headingMaxWidth: 340,
    body: 'Meet nearby pet parents, share trusted advice, and find support when your pet life needs more than an app.',
    bodyMaxWidth: 305,
    hero: exploreHero,
    heroExportHeight: 430,
    heroExportWidth: 402,
  },
];

const stepIndex: Record<IntroStep, number> = {
  moments: 0,
  care: 1,
  explore: 2,
};

type OnboardingPagerProps = {
  initialStep: IntroStep;
};

export function OnboardingPager({ initialStep }: OnboardingPagerProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const safeTop =
    Platform.OS === 'web' ? stageOneTokens.screen.safeTop : insets.top;
  const pageHeight = Math.max(0, height - safeTop - 56);
  const listRef = useRef<FlatList<OnboardingStep>>(null);
  const programmaticSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const initialIndex = stepIndex[initialStep];
  const currentIndexRef = useRef(initialIndex);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [footerHeight, setFooterHeight] = useState<number>(
    stageOneTokens.screen.footerHeight,
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const { finishIntro, persistStep } = useIntroPersistence();

  const settleAtIndex = useCallback(
    (index: number) => {
      if (programmaticSettleTimer.current) {
        clearTimeout(programmaticSettleTimer.current);
        programmaticSettleTimer.current = null;
      }

      const boundedIndex = Math.max(0, Math.min(steps.length - 1, index));
      const destination = steps[boundedIndex];

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
      const boundedIndex = Math.max(0, Math.min(steps.length - 1, index));
      const destination = steps[boundedIndex];

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
    if (currentIndexRef.current < steps.length - 1) {
      void transitionTo(currentIndexRef.current + 1);
      return;
    }

    void finishIntro(steps[currentIndexRef.current].id);
  }, [finishIntro, transitionTo]);

  const handleSkip = useCallback(() => {
    void finishIntro(steps[currentIndexRef.current].id);
  }, [finishIntro]);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={stageOneTokens.color.page} style="dark" />

      <View style={[styles.headerArea, { paddingTop: safeTop }]}>
        <IntroHeader
          canGoBack={currentIndex > 0}
          canSkip={currentIndex < steps.length - 1}
          onBack={() => void transitionTo(currentIndex - 1)}
          onSkip={handleSkip}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.pagerContent}
        data={steps}
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
          <OnboardingPage
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

type OnboardingPageProps = {
  footerHeight: number;
  pageHeight: number;
  pageWidth: number;
  step: OnboardingStep;
};

function OnboardingPage({
  footerHeight,
  pageHeight,
  pageWidth,
  step,
}: OnboardingPageProps) {
  const artworkScale = Math.min(1, pageWidth / stageOneTokens.screen.width);
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
              left:
                (step.heroOffsetX ?? defaultOffsetX) * artworkScale,
              top: (step.heroOffsetY ?? defaultOffsetY) * artworkScale,
            }}
          />
        </View>

        <View style={[styles.copy, { width: contentWidth }]}>
          <Text
            style={[styles.heading, { maxWidth: step.headingMaxWidth }]}
          >
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
  screen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: stageOneTokens.color.page,
  },
  headerArea: {
    position: 'relative',
    zIndex: 3,
    backgroundColor: stageOneTokens.color.page,
  },
  pager: {
    zIndex: 0,
    flex: 1,
  },
  pagerContent: {
    height: '100%',
  },
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
    color: stageOneTokens.color.heading,
    fontFamily: stageOneTokens.font.quicksandSemiBold,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 37.24,
    textAlign: 'center',
  },
  body: {
    color: stageOneTokens.color.body,
    fontFamily: stageOneTokens.font.jakartaRegular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
