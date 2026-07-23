import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AccessibilityInfo,
  Alert,
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BottomNavigation,
  type BottomNavigationDestination,
} from '@/components/navigation/BottomNavigation';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { InsightsTeaser } from '@/features/home/components/InsightsTeaser';
import { QuickActionGrid } from '@/features/home/components/QuickActionGrid';
import { TodayCare } from '@/features/home/components/TodayCare';
import { useHomeSessionGuard } from '@/features/home/state/useHomeSessionGuard';
import { en } from '@/i18n/en';
import { homeTokens } from '@/theme/homeTokens';

export function HomeScreen() {
  const { preview } = useLocalSearchParams<{ preview?: string }>();
  const previewEnabled = __DEV__ && preview === '1';
  const sessionState = useHomeSessionGuard(previewEnabled);
  const insets = useSafeAreaInsets();
  const safeTop =
    Platform.OS === 'web' ? homeTokens.screen.safeTop : insets.top;
  const safeBottom = Platform.OS === 'web' ? 0 : insets.bottom;
  const headerHeight = safeTop + homeTokens.screen.headerRowHeight;
  const navigationHeight =
    homeTokens.screen.bottomNavigationHeight + safeBottom;
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let active = true;

    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) {
        setReduceMotion(enabled);
      }
    });

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    );

    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  const clampedScroll = useMemo(
    () => Animated.diffClamp(scrollY, 0, headerHeight),
    [headerHeight, scrollY],
  );
  const headerTranslateY = clampedScroll.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });
  const navigationTranslateY = clampedScroll.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, navigationHeight],
    extrapolate: 'clamp',
  });
  const handleScroll = useMemo(
    () =>
      Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: Platform.OS !== 'web' },
      ),
    [scrollY],
  );

  const showAlert = useCallback((message: string) => {
    Alert.alert(en.home.alerts.title, message);
  }, []);

  const handleNavigation = useCallback(
    (destination: BottomNavigationDestination) => {
      if (destination === 'home') {
        scrollRef.current?.scrollTo({ animated: !reduceMotion, y: 0 });
        return;
      }

      showAlert(en.home.alerts[destination]);
    },
    [reduceMotion, showAlert],
  );

  if (sessionState === 'checking') {
    return (
      <View style={styles.screen}>
        <StatusBar backgroundColor="transparent" style="dark" translucent />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="transparent" style="dark" translucent />

      <Animated.ScrollView
        bounces={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: headerHeight,
            paddingBottom: navigationHeight,
          },
        ]}
        onScroll={reduceMotion ? undefined : handleScroll}
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contents}>
          <QuickActionGrid
            onFeeding={() => showAlert(en.home.alerts.feeding)}
            onMeds={() => showAlert(en.home.alerts.meds)}
          />
          <TodayCare
            onMedication={() => showAlert(en.home.alerts.task)}
            onVet={() => showAlert(en.home.alerts.task)}
            onWalk={() => showAlert(en.home.alerts.task)}
          />
          <InsightsTeaser
            onPress={() => showAlert(en.home.alerts.insight)}
          />
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.header,
          !reduceMotion && {
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <HomeHeader
          onNotifications={() => showAlert(en.home.alerts.notifications)}
          onProfile={() => showAlert(en.home.alerts.profile)}
          onSearch={() => showAlert(en.home.alerts.search)}
          safeTop={safeTop}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.navigation,
          !reduceMotion && {
            transform: [{ translateY: navigationTranslateY }],
          },
        ]}
      >
        <BottomNavigation
          activeDestination="home"
          bottomInset={safeBottom}
          labels={en.home.navigation}
          onSelect={handleNavigation}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: homeTokens.color.page,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
  },
  contents: {
    width: '100%',
    maxWidth: homeTokens.screen.referenceWidth,
    gap: homeTokens.screen.contentGap,
    paddingHorizontal: homeTokens.screen.contentHorizontalPadding,
    paddingVertical: 16,
  },
  header: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  navigation: {
    position: 'absolute',
    zIndex: 6,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
});
