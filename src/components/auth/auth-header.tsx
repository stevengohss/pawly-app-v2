import { Pressable, StyleSheet, View } from 'react-native';

import BackArrow from '../../../assets/figma/stage1/back-arrow.svg';
import Wordmark from '../../../assets/figma/stage1/wordmark-vector.svg';
import { en } from '@/i18n/en';
import { authTokens } from '@/theme/auth-tokens';

type AuthHeaderProps = {
  onBack?: () => void;
};

export function AuthHeader({ onBack }: AuthHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            accessibilityLabel={en.common.back}
            accessibilityRole="button"
            hitSlop={6}
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <BackArrow height={13.167} width={6.5} />
          </Pressable>
        ) : null}
      </View>

      <View pointerEvents="none" style={styles.center}>
        <Wordmark
          accessibilityLabel={en.common.appName}
          height={40}
          width={114}
        />
      </View>

      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    width: '100%',
    height: authTokens.screen.headerRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: authTokens.screen.horizontalPadding,
  },
  side: {
    position: 'relative',
    top: -2,
    width: 44,
    height: 44,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: authTokens.color.action,
    borderRadius: 48,
  },
  pressed: {
    opacity: 0.65,
  },
});
