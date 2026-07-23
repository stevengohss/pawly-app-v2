import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import { PrimaryButton } from '@/components/auth/primary-button';
import { authTokens } from '@/theme/auth-tokens';

type AuthFooterProps = {
  bottomInset: number;
  disabled?: boolean;
  linkLabel: string;
  loading?: boolean;
  onLayout: (event: LayoutChangeEvent) => void;
  onLinkPress: () => void;
  onPrimaryPress: () => void;
  primaryLabel: string;
  prompt: string;
};

export function AuthFooter({
  bottomInset,
  disabled,
  linkLabel,
  loading,
  onLayout,
  onLinkPress,
  onPrimaryPress,
  primaryLabel,
  prompt,
}: AuthFooterProps) {
  return (
    <View
      onLayout={onLayout}
      style={[styles.footer, { paddingBottom: Math.max(20, bottomInset) }]}
    >
      <PrimaryButton
        disabled={disabled}
        label={primaryLabel}
        loading={loading}
        onPress={onPrimaryPress}
      />
      <View style={styles.footerText}>
        <Text style={styles.prompt}>{prompt}</Text>
        <Pressable
          accessibilityRole="link"
          hitSlop={6}
          onPress={onLinkPress}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={styles.link}>{linkLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    flexShrink: 0,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: authTokens.color.page,
  },
  footerText: {
    width: '100%',
    minHeight: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  prompt: {
    color: authTokens.color.heading,
    fontFamily: authTokens.font.jakartaRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  link: {
    color: authTokens.color.link,
    fontFamily: authTokens.font.jakartaSemiBold,
    fontSize: 14,
    lineHeight: 21,
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.65,
  },
});
