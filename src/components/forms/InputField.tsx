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

import EmailEnvelope from '../../../assets/figma/auth/form-icons/email-envelope.svg';
import EmailFlap from '../../../assets/figma/auth/form-icons/email-flap.svg';
import EyeOuter from '../../../assets/figma/auth/form-icons/eye-outer.svg';
import EyePupil from '../../../assets/figma/auth/form-icons/eye-pupil.svg';
import UserBody from '../../../assets/figma/auth/form-icons/user-body.svg';
import UserHead from '../../../assets/figma/auth/form-icons/user-head.svg';
import { authTokens } from '@/theme/authTokens';

type InputFieldProps = Pick<
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
  hidePasswordAccessibilityLabel?: string;
  hint?: string;
  icon?: ReactNode;
  label: string;
  labelAction?: string;
  labelRowWidth?: number | '100%';
  onLabelAction?: () => void;
  placeholder: string;
  secure?: boolean;
  showPasswordAccessibilityLabel?: string;
};

export function InputField({
  error,
  hidePasswordAccessibilityLabel,
  hint,
  icon,
  label,
  labelAction,
  labelRowWidth,
  onLabelAction,
  placeholder,
  secure,
  showPasswordAccessibilityLabel,
  ...inputProps
}: InputFieldProps) {
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
                  ? hidePasswordAccessibilityLabel
                  : showPasswordAccessibilityLabel
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

type InputIconProps = {
  accessibilityLabel?: string;
};

export function EmailInputIcon({
  accessibilityLabel,
}: InputIconProps) {
  return (
    <View accessibilityLabel={accessibilityLabel} style={styles.icon}>
      <EmailEnvelope
        height={14.833}
        style={styles.emailEnvelope}
        width={18.167}
      />
      <EmailFlap height={4.042} style={styles.emailFlap} width={11.5} />
    </View>
  );
}

export function UserInputIcon({
  accessibilityLabel,
}: InputIconProps) {
  return (
    <View accessibilityLabel={accessibilityLabel} style={styles.icon}>
      <UserHead height={8.167} style={styles.userHead} width={8.167} />
      <UserBody height={9} style={styles.userBody} width={14.167} />
    </View>
  );
}

function EyeIcon() {
  return (
    <View style={styles.icon}>
      <EyeOuter height={14.833} style={styles.eyeOuter} width={18.167} />
      <EyePupil height={5} style={styles.eyePupil} width={5} />
    </View>
  );
}

const inputFieldTokens = authTokens.component.inputField;
const inputFieldContentPaddingHorizontal =
  inputFieldTokens.horizontalPadding - inputFieldTokens.borderWidth;
const inputFieldContentPaddingVertical =
  inputFieldTokens.verticalPadding - inputFieldTokens.borderWidth;

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
    flexDirection: 'row',
    alignItems: 'center',
    gap: inputFieldTokens.gap,
    paddingHorizontal: inputFieldContentPaddingHorizontal,
    paddingVertical: inputFieldContentPaddingVertical,
    borderWidth: inputFieldTokens.borderWidth,
    borderColor: authTokens.color.inputBorder,
    borderRadius: inputFieldTokens.borderRadius,
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
    alignSelf: 'center',
    padding: 0,
    color: authTokens.color.heading,
    fontFamily: authTokens.font.jakartaRegular,
    fontSize: 14,
    textAlignVertical: 'center',
    ...Platform.select({
      android: {
        includeFontPadding: false,
        lineHeight: 21,
      },
      web: {
        lineHeight: 21,
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
  icon: {
    position: 'relative',
    width: inputFieldTokens.iconSize,
    height: inputFieldTokens.iconSize,
  },
  emailEnvelope: {
    position: 'absolute',
    left: 0.917,
    top: 2.583,
  },
  emailFlap: {
    position: 'absolute',
    left: 4.25,
    top: 6.667,
  },
  eyeOuter: {
    position: 'absolute',
    left: 0.917,
    top: 2.583,
  },
  eyePupil: {
    position: 'absolute',
    left: 7.5,
    top: 7.5,
  },
  userHead: {
    position: 'absolute',
    left: 5.917,
    top: 0.917,
  },
  userBody: {
    position: 'absolute',
    left: 2.917,
    top: 10.333,
  },
});
