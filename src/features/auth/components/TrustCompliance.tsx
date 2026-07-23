import { Image } from 'expo-image';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';

import { en } from '@/i18n/en';
import { authTokens } from '@/theme/authTokens';

const petAvatar = require('../../../../assets/figma/auth/pet-avatar.png');

export function TrustCompliance() {
  const showUnavailable = (message: string) => {
    Alert.alert(en.auth.alerts.notReadyTitle, message);
  };

  return (
    <View style={styles.container}>
      <View accessibilityElementsHidden style={styles.avatars}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={[styles.avatarFrame, index < 3 && styles.overlap]}>
            <Image contentFit="cover" source={petAvatar} style={styles.avatar} />
          </View>
        ))}
      </View>
      <View style={styles.copy}>
        <Text style={styles.text}>{en.auth.trust.community}</Text>
        <Text style={styles.text}>{en.auth.trust.agreementLead}</Text>
        <Text style={styles.text}>
          <Text
            onPress={() => showUnavailable(en.auth.alerts.terms)}
            accessibilityRole="link"
            style={styles.link}
          >
            {en.common.terms}{' '}
          </Text>
          {en.auth.trust.agreementJoin}{' '}
          <Text
            onPress={() => showUnavailable(en.auth.alerts.privacy)}
            accessibilityRole="link"
            style={styles.link}
          >
            {en.common.privacy}
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 143,
    alignItems: 'center',
    gap: 16,
  },
  avatars: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFrame: {
    width: 64,
    height: 64,
    overflow: 'hidden',
    padding: 2,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 999,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.16)',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  overlap: {
    marginRight: -16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  copy: {
    width: '100%',
    height: 63,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    width: '100%',
    color: authTokens.color.body,
    fontFamily: authTokens.font.jakartaRegular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  link: {
    color: authTokens.color.progressActive,
  },
});
