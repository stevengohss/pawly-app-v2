import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import ArrowChevron from '../../../assets/figma/actions/forward-arrow-chevron.svg';
import ArrowLine from '../../../assets/figma/actions/forward-arrow-line.svg';
import { pawlyTokens } from '@/theme/pawlyTokens';

type ButtonProps = {
  accessibilityLoadingLabel?: string;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress: () => void;
  showArrow?: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary';
};

export function Button({
  accessibilityLoadingLabel,
  disabled,
  label,
  loading,
  onPress,
  showArrow = true,
  style,
  variant = 'primary',
}: ButtonProps) {
  return (
    <Pressable
      accessibilityLabel={
        loading ? accessibilityLoadingLabel ?? label : label
      }
      accessibilityRole="button"
      accessibilityState={{
        busy: loading,
        disabled: Boolean(disabled || loading),
      }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        style,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={pawlyTokens.color.onAction} size="small" />
      ) : (
        <>
          <Text
            numberOfLines={1}
            style={[
              styles.label,
              variant === 'secondary' && styles.secondaryLabel,
            ]}
          >
            {label}
          </Text>
          {showArrow ? (
            <View accessibilityElementsHidden style={styles.arrow}>
              <ArrowLine
                height={1.5}
                style={styles.arrowLine}
                width={14.083}
              />
              <ArrowChevron
                height={11.5}
                style={styles.arrowChevron}
                width={6.5}
              />
            </View>
          ) : null}
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
    borderColor: pawlyTokens.color.action,
    borderRadius: 999,
    backgroundColor: pawlyTokens.color.action,
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
    color: pawlyTokens.color.onAction,
    fontFamily: pawlyTokens.font.jakartaMedium,
    fontSize: 16,
    lineHeight: 20.48,
    letterSpacing: 0.08,
  },
  secondaryButton: {
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: {
        boxShadow: 'none',
      },
      default: {
        shadowOpacity: 0,
        elevation: 0,
      },
    }),
  },
  secondaryLabel: {
    color: '#99462a',
    fontFamily: pawlyTokens.font.jakartaRegular,
    lineHeight: 24,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  arrowLine: {
    position: 'absolute',
    left: 2.583,
    top: 9.25,
  },
  arrowChevron: {
    position: 'absolute',
    left: 11.667,
    top: 4.25,
  },
  pressed: {
    opacity: 0.84,
  },
  disabled: {
    opacity: 0.55,
  },
});
