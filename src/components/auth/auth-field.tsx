import { useState, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { EyeIcon } from '@/components/auth/auth-icons';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/auth-tokens';

type AuthFieldProps = Pick<
  TextInputProps,
  | 'autoCapitalize'
  | 'autoComplete'
  | 'keyboardType'
  | 'onBlur'
  | 'onChangeText'
  | 'returnKeyType'
  | 'textContentType'
  | 'value'
> & {
  error?: string;
  hint?: string;
  icon?: ReactNode;
  label: string;
  labelRowWidth?: number | '100%';
  onLabelAction?: () => void;
  labelAction?: string;
  placeholder: string;
  secure?: boolean;
};

export function AuthField({
  error,
  hint,
  icon,
  label,
  labelAction,
  labelRowWidth,
  onLabelAction,
  placeholder,
  secure,
  ...inputProps
}: AuthFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const message = error ?? hint;

  return (
    <View style={styles.field}>
      <View style={styles.main}>
        <View
          style={[
            styles.labelRow,
            labelRowWidth !== undefined && { width: labelRowWidth },
          ]}
        >
          <Text style={styles.label}>{label}</Text>
          {labelAction && onLabelAction ? (
            <Pressable
              accessibilityRole="link"
              hitSlop={6}
              onPress={onLabelAction}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.labelAction}>{labelAction}</Text>
            </Pressable>
          ) : null}
        </View>
        <View style={[styles.inputFrame, error && styles.inputError]}>
          <TextInput
            {...inputProps}
            placeholder={placeholder}
            placeholderTextColor={authTokens.color.placeholder}
            secureTextEntry={secure && !isVisible}
            selectionColor={authTokens.color.action}
            style={styles.input}
          />
          {secure ? (
            <Pressable
              accessibilityLabel={
                isVisible
                  ? en.auth.accessibility.hidePassword
                  : en.auth.accessibility.showPassword
              }
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => setIsVisible((current) => !current)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <EyeIcon />
            </Pressable>
          ) : (
            icon
          )}
        </View>
      </View>
      {message ? (
        <Text style={[styles.hint, error && styles.error]}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 8,
  },
  main: {
    width: '100%',
    gap: 8,
  },
  labelRow: {
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    minWidth: 0,
    flex: 1,
    color: authTokens.color.body,
    fontFamily: authTokens.font.jakartaMedium,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.08,
  },
  labelAction: {
    color: authTokens.color.link,
    fontFamily: authTokens.font.jakartaMedium,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.08,
  },
  inputFrame: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: authTokens.color.inputBorder,
    borderRadius: 8,
    backgroundColor: authTokens.color.inputBackground,
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
  inputError: {
    borderColor: authTokens.color.error,
  },
  input: {
    minWidth: 0,
    flex: 1,
    height: 21,
    alignSelf: 'center',
    padding: 0,
    color: authTokens.color.heading,
    fontFamily: authTokens.font.jakartaRegular,
    fontSize: 14,
    lineHeight: 21,
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        transform: [{ translateY: -2 }],
      },
      android: {
        includeFontPadding: false,
      },
      web: {
        outlineWidth: 0,
      },
    }),
  },
  hint: {
    width: '100%',
    color: authTokens.color.caption,
    fontFamily: authTokens.font.jakartaMedium,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.06,
  },
  error: {
    color: authTokens.color.error,
  },
  pressed: {
    opacity: 0.65,
  },
});
