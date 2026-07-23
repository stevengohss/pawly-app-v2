import { Platform, StyleSheet, Text, View } from 'react-native';

import HeartLeft from '../../../../assets/figma/auth/feature-icons/heart-left.svg';
import HeartRight from '../../../../assets/figma/auth/feature-icons/heart-right.svg';
import JoyCircle from '../../../../assets/figma/auth/feature-icons/joy-circle.svg';
import JoyDetail from '../../../../assets/figma/auth/feature-icons/joy-detail.svg';
import JoyEyeOne from '../../../../assets/figma/auth/feature-icons/joy-eye-one.svg';
import JoyEyeTwo from '../../../../assets/figma/auth/feature-icons/joy-eye-two.svg';
import JoyMouth from '../../../../assets/figma/auth/feature-icons/joy-mouth.svg';
import PeopleBase from '../../../../assets/figma/auth/feature-icons/people-base.svg';
import PeopleBody from '../../../../assets/figma/auth/feature-icons/people-body.svg';
import PeopleHead from '../../../../assets/figma/auth/feature-icons/people-head.svg';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/authTokens';

const features = [
  { id: 'care', label: en.auth.welcome.care, icon: <HeartIcon /> },
  { id: 'social', label: en.auth.welcome.social, icon: <PeopleIcon /> },
  { id: 'joy', label: en.auth.welcome.joy, icon: <JoyIcon /> },
] as const;

export function WelcomeFeatureHighlights() {
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

function HeartIcon() {
  return (
    <View accessibilityElementsHidden style={styles.featureIcon}>
      <HeartLeft height={17.213} style={styles.heartLeft} width={10} />
      <HeartRight height={17.213} style={styles.heartRight} width={10} />
    </View>
  );
}

function PeopleIcon() {
  return (
    <View accessibilityElementsHidden style={styles.featureIcon}>
      <PeopleHead height={4} style={styles.peopleHead} width={4} />
      <PeopleBody height={10.638} style={styles.peopleBody} width={13.5} />
      <PeopleBase height={7.5} style={styles.peopleBase} width={20} />
    </View>
  );
}

function JoyIcon() {
  return (
    <View accessibilityElementsHidden style={styles.featureIcon}>
      <JoyCircle height={20} style={styles.joyCircle} width={20} />
      <JoyMouth height={3.62} style={styles.joyMouth} width={7.97} />
      <JoyEyeOne height={3.41} style={styles.joyEyeOne} width={2.71} />
      <JoyEyeTwo height={3.41} style={styles.joyEyeTwo} width={2.71} />
      <JoyDetail height={3.1} style={styles.joyDetail} width={3.32} />
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
  featureIcon: {
    position: 'relative',
    width: 24,
    height: 24,
  },
  heartLeft: {
    position: 'absolute',
    left: 2,
    top: 3.285,
  },
  heartRight: {
    position: 'absolute',
    left: 12,
    top: 3.285,
  },
  peopleHead: {
    position: 'absolute',
    left: 10,
    top: 2,
  },
  peopleBody: {
    position: 'absolute',
    left: 5.25,
    top: 7.862,
  },
  peopleBase: {
    position: 'absolute',
    left: 2,
    top: 14.5,
  },
  joyCircle: {
    position: 'absolute',
    left: 2,
    top: 2,
  },
  joyMouth: {
    position: 'absolute',
    left: 8.91,
    top: 13.86,
    transform: [{ rotate: '-15deg' }],
  },
  joyEyeOne: {
    position: 'absolute',
    left: 13,
    top: 8.17,
    transform: [{ rotate: '-15deg' }],
  },
  joyEyeTwo: {
    position: 'absolute',
    left: 7.37,
    top: 9.72,
    transform: [{ rotate: '-15deg' }],
  },
  joyDetail: {
    position: 'absolute',
    left: 13,
    top: 14.72,
  },
});
