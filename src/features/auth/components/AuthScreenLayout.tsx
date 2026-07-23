import { StatusBar } from 'expo-status-bar';
import { useState, type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PageHeader } from '@/components/navigation/PageHeader';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/authTokens';

type AuthScreenLayoutProps = {
  children: (contentHeight: number) => ReactNode;
  footer: (props: {
    bottomInset: number;
    onLayout: (event: LayoutChangeEvent) => void;
  }) => ReactNode;
  onBack?: () => void;
};

export function AuthScreenLayout({
  children,
  footer,
  onBack,
}: AuthScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const safeTop = Platform.OS === 'web' ? authTokens.screen.safeTop : insets.top;
  const [footerHeight, setFooterHeight] = useState<number>(
    authTokens.screen.footerHeight,
  );
  const contentHeight = Math.max(
    0,
    height - safeTop - authTokens.screen.headerRowHeight - footerHeight,
  );

  const handleFooterLayout = (event: LayoutChangeEvent) => {
    const measured = Math.ceil(event.nativeEvent.layout.height);
    setFooterHeight((current) => (current === measured ? current : measured));
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={authTokens.color.page} style="dark" />
      <View style={{ paddingTop: safeTop }}>
        <PageHeader
          appName={en.common.appName}
          backAccessibilityLabel={en.common.back}
          centerAlignment="start"
          onBack={onBack}
          sideOffsetY={-2}
          sideSlotWidth={44}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
        style={styles.flex}
      >
        <ScrollView
          automaticallyAdjustKeyboardInsets
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.flex}
        >
          {children(contentHeight)}
        </ScrollView>
        {footer({ bottomInset: insets.bottom, onLayout: handleFooterLayout })}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: authTokens.color.page,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
