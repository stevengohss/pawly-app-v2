import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PageHeader } from '@/components/layout/PageHeader';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { WelcomeFeatureHighlights } from '@/features/auth/components/WelcomeFeatureHighlights';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/authTokens';

const welcomeBackground = require('../../../../assets/figma/auth/welcome-background.png');

export function WelcomeScreen() {
  const router = useRouter();
  const { authenticatedFallback } = useLocalSearchParams<{
    authenticatedFallback?: string;
  }>();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const safeTop = Platform.OS === 'web' ? authTokens.screen.safeTop : insets.top;
  const [footerHeight, setFooterHeight] = useState<number>(
    authTokens.screen.footerHeight,
  );
  const hasShownFallback = useRef(false);

  useEffect(() => {
    if (authenticatedFallback !== '1' || hasShownFallback.current) {
      return;
    }

    hasShownFallback.current = true;
    Alert.alert(
      en.auth.alerts.authenticatedTitle,
      en.auth.alerts.authenticated,
    );
    router.setParams({ authenticatedFallback: undefined });
  }, [authenticatedFallback, router]);

  const handleFooterLayout = useCallback((event: LayoutChangeEvent) => {
    const measured = Math.ceil(event.nativeEvent.layout.height);
    setFooterHeight((current) => (current === measured ? current : measured));
  }, []);

  const contentHeight = Math.max(
    0,
    height - safeTop - authTokens.screen.headerRowHeight - footerHeight,
  );
  const designScale = width / authTokens.screen.width;
  const backgroundWidth = 546.318 * designScale;

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="transparent" style="dark" translucent />
      <View
        accessibilityElementsHidden
        pointerEvents="none"
        style={[styles.background, { height: 530 * designScale }]}
      >
        <Image
          contentFit="fill"
          source={welcomeBackground}
          style={{
            position: 'absolute',
            top: 0,
            left: -72.159 * designScale,
            width: backgroundWidth,
            height: 530 * designScale,
          }}
        />
        <LinearGradient
          colors={['rgba(250,249,246,0)', 'rgba(250,249,246,0)', '#faf9f6']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={{ paddingTop: safeTop }}>
        <PageHeader
          appName={en.common.appName}
          backAccessibilityLabel={en.common.back}
          backgroundColor="transparent"
          centerAlignment="start"
          sideOffsetY={-2}
          sideSlotWidth={44}
        />
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={[styles.content, { minHeight: contentHeight }]}>
          <View style={styles.spacer} />
          <View style={styles.copy}>
            <Text style={styles.heading}>{en.auth.welcome.heading}</Text>
            <Text style={styles.body}>{en.auth.welcome.body}</Text>
          </View>
          <WelcomeFeatureHighlights />
        </View>
      </ScrollView>

      <AuthFooter
        bottomInset={insets.bottom}
        linkLabel={en.auth.welcome.signUp}
        onLayout={handleFooterLayout}
        onLinkPress={() => router.push('/auth/sign-up')}
        onPrimaryPress={() => router.push('/auth/sign-in')}
        primaryLabel={en.auth.welcome.signIn}
        prompt={en.auth.welcome.noAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: authTokens.color.page,
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    overflow: 'hidden',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  spacer: {
    width: '100%',
    height: 350,
  },
  copy: {
    width: '100%',
    maxWidth: 512,
    alignItems: 'center',
    gap: 8,
  },
  heading: {
    color: authTokens.color.title,
    fontFamily: authTokens.font.quicksandSemiBold,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 37.24,
    textAlign: 'center',
  },
  body: {
    width: 300,
    maxWidth: '100%',
    color: authTokens.color.body,
    fontFamily: authTokens.font.jakartaRegular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
