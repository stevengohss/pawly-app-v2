import { Image, type ImageSource } from 'expo-image';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AddIcon from '../../../assets/figma/drawer/add.svg';
import EditSmallIcon from '../../../assets/figma/drawer/edit-small.svg';
import { drawerTokens } from '@/theme/drawerTokens';

type PetProfileSelectorProps = {
  accessibilityLabel: string;
  label: string;
  onPress: () => void;
  source?: ImageSource | number;
  state?: 'default' | 'add';
};

export function PetProfileSelector({
  accessibilityLabel,
  label,
  onPress,
  source,
  state = 'default',
}: PetProfileSelectorProps) {
  const isAdd = state === 'add';

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isAdd && styles.addContainer,
        pressed && styles.pressed,
      ]}
    >
      {isAdd ? (
        <View style={styles.addAvatar}>
          <AddIcon
            height={32}
            pointerEvents="none"
            width={32}
          />
        </View>
      ) : (
        <View style={styles.avatarContainer}>
          <View style={styles.avatarFrame}>
            <Image contentFit="cover" source={source} style={styles.image} />
          </View>
          <View style={styles.editBadge}>
            <EditSmallIcon
              height={drawerTokens.avatar.petEditIconSize}
              pointerEvents="none"
              width={drawerTokens.avatar.petEditIconSize}
            />
          </View>
        </View>
      )}

      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: drawerTokens.spacing.xs,
  },
  addContainer: {
    opacity: drawerTokens.state.addOpacity,
  },
  avatarContainer: {
    width: drawerTokens.avatar.petSize,
    height: drawerTokens.avatar.petSize,
    position: 'relative',
  },
  avatarFrame: {
    width: drawerTokens.avatar.petSize,
    height: drawerTokens.avatar.petSize,
    overflow: 'hidden',
    padding: drawerTokens.avatar.imagePadding,
    borderWidth: drawerTokens.avatar.borderWidth,
    borderColor: drawerTokens.color.onAction,
    borderRadius: drawerTokens.avatar.petSize / 2,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        boxShadow: drawerTokens.shadow.avatarWeb,
      },
      default: {
        shadowColor: drawerTokens.color.shadow,
        shadowOffset: {
          width: 0,
          height: drawerTokens.shadow.avatarOffset,
        },
        shadowOpacity: drawerTokens.shadow.avatarOpacity,
        shadowRadius: drawerTokens.shadow.avatarRadius,
        elevation: drawerTokens.shadow.avatarElevation,
      },
    }),
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius:
      drawerTokens.avatar.petSize / 2 -
      drawerTokens.avatar.borderWidth -
      drawerTokens.avatar.imagePadding,
  },
  editBadge: {
    position: 'absolute',
    right: drawerTokens.avatar.petBadgeOffset,
    bottom: drawerTokens.avatar.petBadgeOffset,
    width: drawerTokens.avatar.petBadgeSize,
    height: drawerTokens.avatar.petBadgeSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: drawerTokens.avatar.borderWidth,
    borderColor: drawerTokens.color.onAction,
    borderRadius: drawerTokens.avatar.petBadgeSize / 2,
    backgroundColor: drawerTokens.color.action,
  },
  addAvatar: {
    width: drawerTokens.avatar.petSize,
    height: drawerTokens.avatar.petSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: drawerTokens.avatar.borderWidth,
    borderColor: drawerTokens.color.actionStrong,
    borderStyle: 'dashed',
    borderRadius: drawerTokens.avatar.petSize / 2,
  },
  label: {
    maxWidth: drawerTokens.layout.petLabelWidth,
    color: drawerTokens.color.body,
    fontFamily: drawerTokens.font.jakartaRegular,
    fontSize: drawerTokens.typography.caption.fontSize,
    lineHeight: drawerTokens.typography.caption.lineHeight,
    textAlign: 'center',
  },
  pressed: {
    opacity: drawerTokens.state.pressedOpacity,
  },
});
