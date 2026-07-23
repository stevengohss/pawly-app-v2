import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as NativeSplashScreen from 'expo-splash-screen';
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

import { LaunchProgressBar } from '@/features/launch/components/LaunchProgressBar';
import { bootstrapApp } from '@/features/launch/services/bootstrapApp';
import { pawlyTokens } from '@/theme/pawlyTokens';

const splashLogo = require('../../../../assets/figma/brand/splash-logo.png');
const finalAnimationMs = 260;

export function SplashScreen() {
  const router = useRouter();
  const { launchScenario } = useLocalSearchParams<{
    launchScenario?: string;
  }>();
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0.06)).current;
  const latestTarget = useRef(0.06);
  const hasStarted = useRef(false);

  useEffect(() => {
    void NativeSplashScreen.hideAsync().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;
    let cancelled = false;

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

    const run = async () => {
      const route = await bootstrapApp({
        launchScenario,
        onMilestone: animateTo,
      });

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
        router.replace(route);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [launchScenario, progress, router]);

  const versionBottom = Math.max(39, insets.bottom + 8);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={pawlyTokens.color.page} style="dark" />

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

        <LaunchProgressBar progress={progress} />
      </View>

      <Text style={[styles.version, { bottom: versionBottom }]}>ver 2.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: pawlyTokens.color.page,
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
    color: pawlyTokens.color.caption,
    fontFamily: pawlyTokens.font.quicksandSemiBold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
  version: {
    position: 'absolute',
    alignSelf: 'center',
    color: pawlyTokens.color.caption,
    fontFamily: pawlyTokens.font.jakartaMedium,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.06,
    lineHeight: 15.36,
    textAlign: 'center',
  },
});
