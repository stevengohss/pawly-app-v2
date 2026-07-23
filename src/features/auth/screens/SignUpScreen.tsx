import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import {
  EmailInputIcon,
  InputField,
  UserInputIcon,
} from '@/components/forms/InputField';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout';
import { TrustCompliance } from '@/features/auth/components/TrustCompliance';
import { signUpWithEmail } from '@/features/auth/services/authService';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from '@/features/auth/validation/authValidation';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/authTokens';

type Errors = {
  confirmPassword?: string;
  email?: string;
  fullName?: string;
  password?: string;
};

export function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (loading) {
      return;
    }

    const nextErrors: Errors = {
      fullName: validateName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validatePasswordConfirmation(
        password,
        confirmPassword,
      ),
    };
    setErrors(nextErrors);

    if (
      nextErrors.fullName ||
      nextErrors.email ||
      nextErrors.password ||
      nextErrors.confirmPassword
    ) {
      return;
    }

    setLoading(true);

    try {
      const result = await signUpWithEmail({ email, fullName, password });

      if (result.status === 'authenticated') {
        router.replace({
          pathname: '/auth/welcome',
          params: { authenticatedFallback: '1' },
        });
        return;
      }

      if (result.status === 'confirmation-required') {
        Alert.alert(
          en.auth.alerts.checkEmailTitle,
          en.auth.alerts.checkEmail,
          [
            {
              text: en.auth.alerts.confirm,
              onPress: () => router.replace('/auth/sign-in'),
            },
          ],
        );
        return;
      }

      setErrors({ password: result.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreenLayout
      footer={({ bottomInset, onLayout }) => (
        <AuthFooter
          bottomInset={bottomInset}
          linkLabel={en.auth.signUp.signIn}
          loading={loading}
          onLayout={onLayout}
          onLinkPress={() => router.replace('/auth/sign-in')}
          onPrimaryPress={() => void handleCreateAccount()}
          primaryLabel={en.auth.signUp.createAccount}
          prompt={en.auth.signUp.existingAccount}
        />
      )}
      onBack={() => router.back()}
    >
      {(contentHeight) => (
        <View style={[styles.content, { minHeight: contentHeight }]}>
          <View style={styles.header}>
            <Text style={styles.heading}>{en.auth.signUp.heading}</Text>
            <Text style={styles.body}>{en.auth.signUp.body}</Text>
          </View>

          <View style={styles.form}>
            <InputField
              autoCapitalize="words"
              autoComplete="name"
              error={errors.fullName}
              icon={
                <UserInputIcon
                  accessibilityLabel={en.auth.accessibility.fullNameIcon}
                />
              }
              label={en.auth.signUp.fullNameLabel}
              onChangeText={(value) => {
                setFullName(value);
                if (errors.fullName) {
                  setErrors((current) => ({
                    ...current,
                    fullName: undefined,
                  }));
                }
              }}
              placeholder={en.auth.signUp.fullNamePlaceholder}
              returnKeyType="next"
              textContentType="name"
              value={fullName}
            />
            <InputField
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
              icon={
                <EmailInputIcon
                  accessibilityLabel={en.auth.accessibility.emailIcon}
                />
              }
              keyboardType="email-address"
              label={en.auth.signUp.emailLabel}
              onChangeText={(value) => {
                setEmail(value);
                if (errors.email) {
                  setErrors((current) => ({
                    ...current,
                    email: undefined,
                  }));
                }
              }}
              placeholder={en.auth.signUp.emailPlaceholder}
              returnKeyType="next"
              textContentType="emailAddress"
              value={email}
            />
            <InputField
              autoCapitalize="none"
              autoComplete="new-password"
              error={errors.password}
              hint={en.auth.signUp.passwordHint}
              label={en.auth.signUp.passwordLabel}
              labelRowWidth={200}
              onChangeText={(value) => {
                setPassword(value);
                if (errors.password) {
                  setErrors((current) => ({
                    ...current,
                    password: undefined,
                  }));
                }
              }}
              placeholder={en.auth.signUp.passwordPlaceholder}
              returnKeyType="next"
              secure
              hidePasswordAccessibilityLabel={
                en.auth.accessibility.hidePassword
              }
              showPasswordAccessibilityLabel={
                en.auth.accessibility.showPassword
              }
              textContentType="newPassword"
              value={password}
            />
            <InputField
              autoCapitalize="none"
              autoComplete="new-password"
              error={errors.confirmPassword}
              hint={en.auth.signUp.confirmPasswordHint}
              label={en.auth.signUp.confirmPasswordLabel}
              labelRowWidth={200}
              onChangeText={(value) => {
                setConfirmPassword(value);
                if (errors.confirmPassword) {
                  setErrors((current) => ({
                    ...current,
                    confirmPassword: undefined,
                  }));
                }
              }}
              placeholder={en.auth.signUp.confirmPasswordPlaceholder}
              returnKeyType="done"
              secure
              hidePasswordAccessibilityLabel={
                en.auth.accessibility.hidePassword
              }
              showPasswordAccessibilityLabel={
                en.auth.accessibility.showPassword
              }
              textContentType="newPassword"
              value={confirmPassword}
            />
          </View>

          <TrustCompliance />
        </View>
      )}
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    maxWidth: 512,
    gap: 8,
  },
  heading: {
    color: authTokens.color.title,
    fontFamily: authTokens.font.quicksandSemiBold,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 37.24,
  },
  body: {
    color: authTokens.color.title,
    fontFamily: authTokens.font.jakartaRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    width: '100%',
    gap: 12,
    padding: 8,
  },
});
