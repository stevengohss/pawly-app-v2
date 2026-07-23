import { Platform, StyleSheet, Text, View } from 'react-native';

import {
  HeartIcon,
  JoyIcon,
  PeopleIcon,
} from '@/components/auth/auth-icons';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/auth-tokens';

const features = [
  { id: 'care', label: en.auth.welcome.care, icon: <HeartIcon /> },
  { id: 'social', label: en.auth.welcome.social, icon: <PeopleIcon /> },
  { id: 'joy', label: en.auth.welcome.joy, icon: <JoyIcon /> },
] as const;

export function AppFeatures() {
  return (
    <View style={styles.list}>
      {features.map((feature) => (
        <View
          accessibilityLabel={feature.label}
          key={feature.id}
          style={styles.chip}
        >
          {feature.icon}
          <Text style={styles.label}>{feature.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: 350,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 12,
  },
  chip: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#ffffff',
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
    color: authTokens.color.heading,
    fontFamily: authTokens.font.jakartaSemiBold,
    fontSize: 18,
    lineHeight: 23.04,
    textAlign: 'center',
  },
});
