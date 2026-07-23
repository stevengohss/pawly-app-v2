import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { resolveStageOneRoute } from '@/features/stage-one/route-policy';
import { loadLaunchState } from '@/lib/launch-state';
import { restoreSessionWithTimeout } from '@/lib/supabase';
import { stageOneTokens } from '@/theme/stage-one-tokens';

const splashLogo = require('../../assets/figma/stage1/splash-logo.png');
const momentsHero = require('../../assets/figma/stage1/moments-hero.png');
const careHero = require('../../assets/figma/stage1/care-hero.png');
const exploreHero = require('../../assets/figma/stage1/explore-hero.png');
const welcomeBackground = require('../../assets/figma/stage2/welcome-background.png');
const petAvatar = require('../../assets/figma/stage2/pet-avatar.png');

const minimumDisplayMs = 1_000;
const finalAnimationMs = 260;

export default function IndexRoute() {
  const router = useRouter();
  const { launchScenario } = useLocalSearchParams<{
    launchScenario?: string;
  }>();
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0.06)).current;
  const latestTarget = useRef(0.06);
  const hasStarted = useRef(false);

  useEffect(() => {
    void SplashScreen.hideAsync().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;
    let cancelled = false;
    const startedAt = Date.now();

    const animateTo = (target: number, duration = 240) => {
      if (target <= latestTarget.current) {
        return;
      }

      latestTarget.current = target;
      Animated.timing(progress, {
        duration,
        easing: Easing.out(Easing.cubic),
        toValue: target,
        useNativeDriver: false,
      }).start();
    };

    const track = async <T,>(
      promise: Promise<T>,
      target: number,
    ): Promise<T> => {
      const result = await promise;
      animateTo(target);
      return result;
    };

    const run = async () => {
      animateTo(0.14, 180);

      const fonts = track(
        Font.loadAsync({
          PlusJakartaSans_400Regular,
          PlusJakartaSans_500Medium,
          PlusJakartaSans_600SemiBold,
          PlusJakartaSans_700Bold,
          Quicksand_600SemiBold,
        }),
        0.34,
      );
      const assets = track(
        Asset.loadAsync([
          splashLogo,
          momentsHero,
          careHero,
          exploreHero,
          welcomeBackground,
          petAvatar,
        ]),
        0.54,
      );
      const state = track(loadLaunchState(), 0.74);
      const session = track(restoreSessionWithTimeout(), 0.9);

      const [stateResult, , , sessionResult] = await Promise.all([
        state,
        fonts.catch(() => undefined),
        assets.catch(() => undefined),
        session,
      ]);

      const remaining = minimumDisplayMs - (Date.now() - startedAt);
      if (remaining > 0) {
        await delay(remaining);
      }

      animateTo(0.95, 180);
      await delay(180);

      if (cancelled) {
        return;
      }

      await new Promise<void>((resolve) => {
        Animated.timing(progress, {
          duration: finalAnimationMs,
          easing: Easing.inOut(Easing.cubic),
          toValue: 1,
          useNativeDriver: false,
        }).start(() => resolve());
      });

      if (!cancelled) {
        router.replace(
          resolveStageOneRoute(
            stateResult,
            sessionResult.status === 'restored' && sessionResult.hasSession,
            launchScenario,
          ),
        );
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [launchScenario, progress, router]);

  const loaderWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, stageOneTokens.screen.width / 2 - 1],
  });
  const versionBottom = Math.max(39, insets.bottom + 8);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={stageOneTokens.color.page} style="dark" />

      <View style={styles.contents}>
        <View style={styles.brand}>
          <Image
            accessibilityLabel="Pawly"
            contentFit="contain"
            source={splashLogo}
            style={styles.logo}
          />
          <Text style={styles.tagline}>
            {'Every pet has a story.\nA different one.'}
          </Text>
        </View>

        <View
          accessibilityLabel="Loading Pawly"
          accessibilityRole="progressbar"
          style={styles.loaderTrack}
        >
          <Animated.View style={[styles.loaderFill, { width: loaderWidth }]} />
        </View>
      </View>

      <Text style={[styles.version, { bottom: versionBottom }]}>ver 2.0.1</Text>
    </View>
  );
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: stageOneTokens.color.page,
  },
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  brand: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  logo: {
    width: 150,
    height: 132,
  },
  tagline: {
    color: stageOneTokens.color.caption,
    fontFamily: stageOneTokens.font.quicksandSemiBold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
  loaderTrack: {
    width: 200,
    height: 4,
    overflow: 'hidden',
    borderRadius: 48,
    backgroundColor: stageOneTokens.color.loaderTrack,
  },
  loaderFill: {
    height: 4,
    borderRadius: 48,
    backgroundColor: stageOneTokens.color.progressActive,
  },
  version: {
    position: 'absolute',
    alignSelf: 'center',
    color: stageOneTokens.color.caption,
    fontFamily: stageOneTokens.font.jakartaMedium,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.06,
    lineHeight: 15.36,
    textAlign: 'center',
  },
});
