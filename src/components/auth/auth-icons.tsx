import { StyleSheet, View } from 'react-native';

import EmailEnvelope from '../../../assets/figma/stage2/email-envelope.svg';
import EmailFlap from '../../../assets/figma/stage2/email-flap.svg';
import EyeOuter from '../../../assets/figma/stage2/eye-outer.svg';
import EyePupil from '../../../assets/figma/stage2/eye-pupil.svg';
import HeartLeft from '../../../assets/figma/stage2/heart-left.svg';
import HeartRight from '../../../assets/figma/stage2/heart-right.svg';
import JoyCircle from '../../../assets/figma/stage2/joy-circle.svg';
import JoyDetail from '../../../assets/figma/stage2/joy-detail.svg';
import JoyEyeOne from '../../../assets/figma/stage2/joy-eye-one.svg';
import JoyEyeTwo from '../../../assets/figma/stage2/joy-eye-two.svg';
import JoyMouth from '../../../assets/figma/stage2/joy-mouth.svg';
import PeopleBase from '../../../assets/figma/stage2/people-base.svg';
import PeopleBody from '../../../assets/figma/stage2/people-body.svg';
import PeopleHead from '../../../assets/figma/stage2/people-head.svg';
import UserBody from '../../../assets/figma/stage2/user-body.svg';
import UserHead from '../../../assets/figma/stage2/user-head.svg';

type IconProps = {
  accessibilityLabel?: string;
};

export function EmailIcon({ accessibilityLabel }: IconProps) {
  return (
    <View accessibilityLabel={accessibilityLabel} style={styles.icon}>
      <EmailEnvelope height={14.833} style={styles.emailEnvelope} width={18.167} />
      <EmailFlap height={4.042} style={styles.emailFlap} width={11.5} />
    </View>
  );
}

export function EyeIcon({ accessibilityLabel }: IconProps) {
  return (
    <View accessibilityLabel={accessibilityLabel} style={styles.icon}>
      <EyeOuter height={14.833} style={styles.eyeOuter} width={18.167} />
      <EyePupil height={5} style={styles.eyePupil} width={5} />
    </View>
  );
}

export function UserIcon({ accessibilityLabel }: IconProps) {
  return (
    <View accessibilityLabel={accessibilityLabel} style={styles.icon}>
      <UserHead height={8.167} style={styles.userHead} width={8.167} />
      <UserBody height={9} style={styles.userBody} width={14.167} />
    </View>
  );
}

export function HeartIcon() {
  return (
    <View accessibilityElementsHidden style={styles.featureIcon}>
      <HeartLeft height={17.213} style={styles.heartLeft} width={10} />
      <HeartRight height={17.213} style={styles.heartRight} width={10} />
    </View>
  );
}

export function PeopleIcon() {
  return (
    <View accessibilityElementsHidden style={styles.featureIcon}>
      <PeopleHead height={4} style={styles.peopleHead} width={4} />
      <PeopleBody height={10.638} style={styles.peopleBody} width={13.5} />
      <PeopleBase height={7.5} style={styles.peopleBase} width={20} />
    </View>
  );
}

export function JoyIcon() {
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
  icon: {
    position: 'relative',
    width: 20,
    height: 20,
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
