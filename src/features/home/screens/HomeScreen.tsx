import { useLocalSearchParams, useRouter } from 'expo-router';
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
  BOTTOM_NAVIGATION_HEIGHT,
  BottomNavigation,
  type BottomNavigationDestination,
} from '@/components/navigation/BottomNavigation';
import {
  PawlyDrawer,
  type PawlyDrawerPet,
  type PawlyDrawerUser,
} from '@/components/navigation/PawlyDrawer';
import { signOutCurrentUser } from '@/features/auth/services/authService';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { InsightsTeaser } from '@/features/home/components/InsightsTeaser';
import { QuickActionGrid } from '@/features/home/components/QuickActionGrid';
import { TodayCare } from '@/features/home/components/TodayCare';
import { useHomeSessionGuard } from '@/features/home/state/useHomeSessionGuard';
import { en } from '@/i18n/en';
import { homeTokens } from '@/theme/homeTokens';

const drawerUserAvatar = require('../../../../assets/figma/user/home-avatar.jpg');
const drawerPetAvatar = require('../../../../assets/figma/auth/pet-avatar.png');

const drawerUser: PawlyDrawerUser = {
  avatarSource: drawerUserAvatar,
  memberSince: en.drawer.profile.memberSince,
  memberType: en.drawer.profile.memberType,
  name: 'Steven Miller',
};

const drawerPets: PawlyDrawerPet[] = [
  {
    avatarSource: drawerPetAvatar,
    id: 'bella',
    name: 'Bella',
  },
  {
    avatarSource: drawerPetAvatar,
    id: 'oliver',
    name: 'Oliver',
  },
];

export function HomeScreen() {
  const router = useRouter();
  const { preview } = useLocalSearchParams<{ preview?: string }>();
  const previewEnabled = __DEV__ && preview === '1';
  const sessionState = useHomeSessionGuard(previewEnabled);
  const insets = useSafeAreaInsets();
  const safeTop =
    Platform.OS === 'web' ? homeTokens.screen.safeTop : insets.top;
  const safeBottom = Platform.OS === 'web' ? 0 : insets.bottom;
  const headerHeight = safeTop + homeTokens.screen.headerRowHeight;
  const navigationHeight =
    BOTTOM_NAVIGATION_HEIGHT + safeBottom;
  const scrollRef = useRef<ScrollView>(null);
  const avatarRef = useRef<View>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

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

  const handleSignOut = useCallback(async () => {
    const result = await signOutCurrentUser();

    if (result.status === 'error') {
      Alert.alert(en.drawer.alerts.signOutErrorTitle, result.message);
      return false;
    }

    router.replace('/auth/welcome');
    return true;
  }, [router]);

  const restoreAvatarFocus = useCallback(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const avatarButton = Array.from(
        document.querySelectorAll<HTMLElement>('[aria-label]'),
      ).find(
        (element) =>
          element.getAttribute('aria-label') ===
          en.home.accessibility.avatar,
      );

      avatarButton?.focus();
      return;
    }

    avatarRef.current?.focus();
  }, []);

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

      <View
        accessibilityElementsHidden={drawerVisible}
        aria-hidden={drawerVisible}
        importantForAccessibility={
          drawerVisible ? 'no-hide-descendants' : 'auto'
        }
        style={[
          styles.background,
          drawerVisible && styles.backgroundDisabled,
        ]}
      >
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
            avatarRef={avatarRef}
            onNotifications={() => showAlert(en.home.alerts.notifications)}
            onProfile={() => setDrawerVisible(true)}
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
            onAddPress={() => handleNavigation('add')}
            onSelect={handleNavigation}
          />
        </Animated.View>
      </View>

      <PawlyDrawer
        onAddPet={() => showAlert(en.drawer.alerts.addPet)}
        onAgenda={() => showAlert(en.drawer.alerts.agenda)}
        onClose={() => setDrawerVisible(false)}
        onDismiss={restoreAvatarFocus}
        onEditPet={() => showAlert(en.drawer.alerts.pet)}
        onEditUser={() => showAlert(en.drawer.alerts.profile)}
        onNotifications={() => showAlert(en.home.alerts.notifications)}
        onSettings={() => showAlert(en.drawer.alerts.settings)}
        onSignOut={handleSignOut}
        pets={drawerPets}
        reduceMotion={reduceMotion}
        user={drawerUser}
        visible={drawerVisible}
      />
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
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundDisabled: {
    pointerEvents: 'none',
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
