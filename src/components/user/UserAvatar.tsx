import { Image, type ImageSource } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import EditLargeIcon from '../../../assets/figma/drawer/edit-large.svg';
import { pawlyTokens } from '@/theme/pawlyTokens';

type UserAvatarProps = {
  accessibilityLabel: string;
  editable?: boolean;
  size?: 'default' | 'large';
  source: ImageSource | number;
};

export function UserAvatar({
  accessibilityLabel,
  editable = false,
  size = 'default',
  source,
}: UserAvatarProps) {
  const isLarge = size === 'large';

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      style={[styles.container, isLarge && styles.largeContainer]}
    >
      <View style={[styles.frame, isLarge && styles.largeFrame]}>
        <Image
          contentFit="cover"
          source={source}
          style={[styles.image, isLarge && styles.largeImage]}
        />
      </View>
      {editable && isLarge ? (
        <View style={styles.editBadge}>
          <EditLargeIcon
            height={pawlyTokens.component.userAvatar.largeEditIconSize}
            pointerEvents="none"
            width={pawlyTokens.component.userAvatar.largeEditIconSize}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  largeContainer: {
    width: pawlyTokens.component.userAvatar.largeSize,
    height: pawlyTokens.component.userAvatar.largeSize,
  },
  frame: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    padding: 2,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        boxShadow: pawlyTokens.shadow.avatar.web,
      },
      default: {
        shadowColor: pawlyTokens.shadow.avatar.color,
        shadowOffset: pawlyTokens.shadow.avatar.offset,
        shadowOpacity: pawlyTokens.shadow.avatar.opacity,
        shadowRadius: pawlyTokens.shadow.avatar.radius,
        elevation: pawlyTokens.shadow.avatar.elevation,
      },
    }),
  },
  largeFrame: {
    padding: pawlyTokens.component.userAvatar.imagePadding,
    borderWidth: pawlyTokens.component.userAvatar.borderWidth,
    borderColor: pawlyTokens.component.userAvatar.borderColor,
    borderRadius: pawlyTokens.component.userAvatar.largeRadius,
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 4,
  },
  largeImage: {
    borderRadius:
      pawlyTokens.component.userAvatar.largeRadius -
      pawlyTokens.component.userAvatar.borderWidth -
      pawlyTokens.component.userAvatar.imagePadding,
  },
  editBadge: {
    position: 'absolute',
    right: pawlyTokens.component.userAvatar.largeBadgeOffset,
    bottom: pawlyTokens.component.userAvatar.largeBadgeOffset,
    width: pawlyTokens.component.userAvatar.largeBadgeSize,
    height: pawlyTokens.component.userAvatar.largeBadgeSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: pawlyTokens.component.userAvatar.borderWidth,
    borderColor: pawlyTokens.component.userAvatar.borderColor,
    borderRadius: pawlyTokens.component.userAvatar.largeBadgeSize / 2,
    backgroundColor: pawlyTokens.component.userAvatar.badgeColor,
    ...Platform.select({
      web: {
        boxShadow: pawlyTokens.shadow.badge.web,
      },
      default: {
        shadowColor: pawlyTokens.shadow.badge.color,
        shadowOffset: pawlyTokens.shadow.badge.offset,
        shadowOpacity: pawlyTokens.shadow.badge.opacity,
        shadowRadius: pawlyTokens.shadow.badge.radius,
        elevation: pawlyTokens.shadow.badge.elevation,
      },
    }),
  },
});
