import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AuthField } from '@/components/auth/auth-field';
import { AuthFooter } from '@/components/auth/auth-footer';
import { EmailIcon } from '@/components/auth/auth-icons';
import { AuthScreen } from '@/components/auth/auth-screen';
import { TrustCompliance } from '@/components/auth/trust-compliance';
import { signInWithEmail } from '@/features/auth/auth-service';
import {
  validateEmail,
  validatePassword,
} from '@/features/auth/validation';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/auth-tokens';

type Errors = {
  email?: string;
  password?: string;
};

export function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    const nextErrors: Errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setLoading(true);

    try {
      const result = await signInWithEmail(email, password);

      if (result.status === 'authenticated') {
        router.replace({
          pathname: '/auth/welcome',
          params: { authenticatedFallback: '1' },
        });
        return;
      }

      setErrors({
        password:
          result.status === 'error'
            ? result.message
            : en.auth.validation.generic,
      });
    } finally {
      setLoading(false);
    }
  };

  const showForgotAlert = () => {
    Alert.alert(en.auth.alerts.notReadyTitle, en.auth.alerts.forgot);
  };

  return (
    <AuthScreen
      footer={({ bottomInset, onLayout }) => (
        <AuthFooter
          bottomInset={bottomInset}
          loading={loading}
          linkLabel={en.auth.signIn.signUp}
          onLayout={onLayout}
          onLinkPress={() => router.replace('/auth/sign-up')}
          onPrimaryPress={() => void handleSubmit()}
          primaryLabel={en.auth.signIn.submit}
          prompt={en.auth.signIn.noAccount}
        />
      )}
      onBack={() => router.back()}
    >
      {(contentHeight) => (
        <View style={[styles.content, { minHeight: contentHeight }]}>
          <View style={styles.header}>
            <Text style={styles.heading}>{en.auth.signIn.heading}</Text>
            <Text style={styles.body}>{en.auth.signIn.body}</Text>
          </View>

          <View style={styles.form}>
            <AuthField
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
              icon={<EmailIcon accessibilityLabel={en.auth.accessibility.emailIcon} />}
              keyboardType="email-address"
              label={en.auth.signIn.emailLabel}
              onChangeText={(value) => {
                setEmail(value);
                if (errors.email) {
                  setErrors((current) => ({ ...current, email: undefined }));
                }
              }}
              placeholder={en.auth.signIn.emailPlaceholder}
              returnKeyType="next"
              textContentType="emailAddress"
              value={email}
            />
            <AuthField
              autoCapitalize="none"
              autoComplete="current-password"
              error={errors.password}
              hint={en.auth.signIn.passwordHint}
              label={en.auth.signIn.passwordLabel}
              labelAction={en.auth.signIn.forgot}
              onChangeText={(value) => {
                setPassword(value);
                if (errors.password) {
                  setErrors((current) => ({ ...current, password: undefined }));
                }
              }}
              onLabelAction={showForgotAlert}
              placeholder={en.auth.signIn.passwordPlaceholder}
              returnKeyType="done"
              secure
              textContentType="password"
              value={password}
            />
          </View>

          <View style={styles.trust}>
            <TrustCompliance />
          </View>
        </View>
      )}
    </AuthScreen>
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
    minHeight: 0,
    flex: 1,
    gap: 12,
    padding: 8,
  },
  trust: {
    width: '100%',
  },
});
