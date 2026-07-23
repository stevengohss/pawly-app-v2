import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import { FooterCTA } from '@/components/layout/FooterCTA';
import { Button } from '@/components/ui/Button';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/authTokens';

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
    <FooterCTA bottomInset={bottomInset} onLayout={onLayout}>
      <Button
        accessibilityLoadingLabel={en.auth.accessibility.loading}
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
    </FooterCTA>
  );
}

const styles = StyleSheet.create({
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
