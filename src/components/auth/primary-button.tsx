import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { ForwardArrow } from '@/components/stage-one/forward-arrow';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/auth-tokens';

type PrimaryButtonProps = {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress: () => void;
};

export function PrimaryButton({
  disabled,
  label,
  loading,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityLabel={loading ? en.auth.accessibility.loading : label}
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled || loading), busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={authTokens.color.onAction} size="small" />
      ) : (
        <>
          <Text style={styles.label}>{label}</Text>
          <ForwardArrow />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: authTokens.color.action,
    borderRadius: 999,
    backgroundColor: authTokens.color.action,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  label: {
    color: authTokens.color.onAction,
    fontFamily: authTokens.font.jakartaMedium,
    fontSize: 16,
    lineHeight: 20.48,
    letterSpacing: 0.08,
  },
  pressed: {
    opacity: 0.84,
  },
  disabled: {
    opacity: 0.55,
  },
});
