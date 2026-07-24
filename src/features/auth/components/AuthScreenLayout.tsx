import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, type ReactNode } from 'react';
import {
  Keyboard,
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState<number>(
    authTokens.screen.footerHeight,
  );
  const contentHeight = keyboardVisible
    ? 0
    : Math.max(
        0,
        height - safeTop - authTokens.screen.headerRowHeight - footerHeight,
      );

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSubscription = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
      <View style={styles.flex}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          bounces={false}
          contentContainerStyle={[
            styles.scrollContent,
            keyboardVisible && styles.keyboardScrollContent,
          ]}
          keyboardDismissMode={
            Platform.OS === 'ios' ? 'interactive' : 'on-drag'
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.flex}
        >
          {children(contentHeight)}
          {keyboardVisible
            ? footer({
                bottomInset: 0,
                onLayout: handleFooterLayout,
              })
            : null}
        </ScrollView>
        {!keyboardVisible
          ? footer({
              bottomInset: insets.bottom,
              onLayout: handleFooterLayout,
            })
          : null}
      </View>
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
  keyboardScrollContent: {
    flexGrow: 0,
  },
});
