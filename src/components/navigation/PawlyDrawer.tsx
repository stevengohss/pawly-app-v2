import type { ComponentType } from 'react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Constants from 'expo-constants';
import type { ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BellIcon from '../../../assets/figma/drawer/bell.svg';
import CalendarIcon from '../../../assets/figma/drawer/calendar.svg';
import SettingsIcon from '../../../assets/figma/drawer/settings.svg';
import SignOutIcon from '../../../assets/figma/drawer/sign-out.svg';
import { PetProfileSelector } from '@/components/pet/PetProfileSelector';
import { UserAvatar } from '@/components/user/UserAvatar';
import { en } from '@/i18n/en';
import { drawerTokens } from '@/theme/drawerTokens';
import { pawlyTokens } from '@/theme/pawlyTokens';

export type PawlyDrawerUser = {
  avatarSource: ImageSource | number;
  memberSince: string;
  memberType: string;
  name: string;
};

export type PawlyDrawerPet = {
  avatarSource: ImageSource | number;
  id: string;
  name: string;
};

type PawlyDrawerProps = {
  onAddPet: () => void;
  onAgenda: () => void;
  onClose: () => void;
  onDismiss?: () => void;
  onEditPet: (petId: string) => void;
  onEditUser: () => void;
  onNotifications: () => void;
  onSettings: () => void;
  onSignOut: () => Promise<boolean>;
  pets: PawlyDrawerPet[];
  reduceMotion: boolean;
  user: PawlyDrawerUser;
  visible: boolean;
};

export function PawlyDrawer({
  onAddPet,
  onAgenda,
  onClose,
  onDismiss,
  onEditPet,
  onEditUser,
  onNotifications,
  onSettings,
  onSignOut,
  pets,
  reduceMotion,
  user,
  visible,
}: PawlyDrawerProps) {
  const { width: viewportWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [mounted, setMounted] = useState(visible);
  const [signOutPressed, setSignOutPressed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const appVersion = Constants.expoConfig?.version;
  const drawerWidth = Math.min(
    drawerTokens.layout.width,
    Math.max(
      0,
      viewportWidth - drawerTokens.layout.minimumBackdropTarget,
    ),
  );
  const menuWidth = Math.min(
    drawerTokens.layout.menuWidth,
    Math.max(
      0,
      drawerWidth - drawerTokens.layout.menuHorizontalInset,
    ),
  );
  const safeTop =
    Platform.OS === 'web' ? drawerTokens.layout.safeTop : insets.top;
  const safeBottom =
    Platform.OS === 'web'
      ? drawerTokens.layout.footerBottomPadding
      : Math.max(drawerTokens.layout.footerBottomPadding, insets.bottom);

  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    progress.stopAnimation();

    if (reduceMotion) {
      progress.setValue(visible ? 1 : 0);
      if (!visible) {
        setMounted(false);
        onDismiss?.();
      }
      return;
    }

    const animation = Animated.timing(progress, {
      duration: visible
        ? drawerTokens.motion.openDuration
        : drawerTokens.motion.closeDuration,
      easing: visible
        ? Easing.out(Easing.cubic)
        : Easing.in(Easing.cubic),
      toValue: visible ? 1 : 0,
      useNativeDriver: Platform.OS !== 'web',
    });

    animation.start(({ finished }) => {
      if (finished && !visible) {
        setMounted(false);
        onDismiss?.();
      }
    });

    return () => {
      animation.stop();
    };
  }, [mounted, onDismiss, progress, reduceMotion, visible]);

  useEffect(() => {
    if (visible) {
      AccessibilityInfo.announceForAccessibility(
        en.drawer.accessibility.opened,
      );
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, visible]);

  const handleSignOut = useCallback(async () => {
    if (signingOut) {
      return;
    }

    setSigningOut(true);
    const didSignOut = await onSignOut();
    setSigningOut(false);

    if (didSignOut) {
      onClose();
    }
  }, [onClose, onSignOut, signingOut]);

  if (!mounted) {
    return null;
  }

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-drawerWidth, 0],
  });

  return (
    <Modal
      animationType="none"
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      transparent
      visible={mounted}
    >
      <View style={styles.modalRoot}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.overlay,
            {
              opacity: progress,
            },
          ]}
        />
        <Pressable
          accessibilityLabel={en.drawer.accessibility.close}
          accessibilityRole="button"
          onPress={onClose}
          style={styles.backdropTarget}
        />

        <Animated.View
          accessibilityViewIsModal
          style={[
            styles.drawerShadow,
            {
              width: drawerWidth,
              transform: [{ translateX }],
            },
          ]}
        >
          <View style={styles.drawerSurface}>
            <LinearGradient
              colors={[
                drawerTokens.color.softPrimary,
                drawerTokens.color.page,
              ]}
              end={{ x: 0, y: 1 }}
              start={{ x: 0, y: 0 }}
              style={[
                styles.header,
                {
                  paddingTop: safeTop,
                },
              ]}
            >
              <Pressable
                accessibilityLabel={en.drawer.accessibility.editProfile}
                accessibilityRole="button"
                onPress={onEditUser}
                style={({ pressed }) => [
                  styles.userProfile,
                  pressed && styles.pressed,
                ]}
              >
                <UserAvatar
                  accessibilityLabel={en.drawer.accessibility.profileImage}
                  editable
                  size="large"
                  source={user.avatarSource}
                />
                <View style={styles.userInfo}>
                  <Text numberOfLines={2} style={styles.userName}>
                    {user.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.memberType}>
                    {user.memberType}
                  </Text>
                  <Text numberOfLines={1} style={styles.memberSince}>
                    {user.memberSince}
                  </Text>
                </View>
              </Pressable>
            </LinearGradient>

            <ScrollView
              bounces={false}
              contentContainerStyle={styles.bodyContent}
              showsVerticalScrollIndicator={false}
              style={styles.body}
            >
              <View style={styles.myPets}>
                <View style={styles.petsHeading}>
                  <Text style={styles.sectionHeading}>
                    {en.drawer.furryFamily}
                  </Text>
                </View>
                <ScrollView
                  contentContainerStyle={styles.petList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.petScroller}
                >
                  {pets.map((pet) => (
                    <PetProfileSelector
                      accessibilityLabel={`${en.drawer.accessibility.editPet} ${pet.name}`}
                      key={pet.id}
                      label={pet.name}
                      onPress={() => onEditPet(pet.id)}
                      source={pet.avatarSource}
                    />
                  ))}
                  <PetProfileSelector
                    accessibilityLabel={en.drawer.accessibility.addPet}
                    label={en.drawer.addPet}
                    onPress={onAddPet}
                    state="add"
                  />
                </ScrollView>
              </View>

              <View style={[styles.menu, { width: menuWidth }]}>
                <View style={styles.divider} />
                <DrawerMenuItem
                  Icon={CalendarIcon}
                  label={en.drawer.agenda}
                  onPress={onAgenda}
                />
                <DrawerMenuItem
                  Icon={BellIcon}
                  label={en.drawer.notifications}
                  onPress={onNotifications}
                />
                <View style={styles.divider} />
                <DrawerMenuItem
                  Icon={SettingsIcon}
                  label={en.drawer.settings}
                  onPress={onSettings}
                />
              </View>
            </ScrollView>

            <View
              style={[
                styles.footer,
                {
                  paddingBottom: safeBottom,
                },
              ]}
            >
              <View style={styles.signOutSlot}>
                <View
                  accessibilityElementsHidden
                  aria-hidden
                  importantForAccessibility="no-hide-descendants"
                  pointerEvents="none"
                  style={[
                    styles.signOutContent,
                    (signOutPressed || signingOut) && styles.pressed,
                  ]}
                >
                  <SignOutIcon
                    height={18}
                    pointerEvents="none"
                    width={18}
                  />
                  <Text style={styles.signOutLabel}>{en.drawer.signOut}</Text>
                </View>
                <Pressable
                  accessibilityLabel={en.drawer.accessibility.signOut}
                  accessibilityRole="button"
                  disabled={signingOut}
                  onPress={() => {
                    void handleSignOut();
                  }}
                  onPressIn={() => setSignOutPressed(true)}
                  onPressOut={() => setSignOutPressed(false)}
                  style={styles.signOutTouchTarget}
                />
              </View>
              <Text style={styles.version}>
                v{appVersion ?? '—'}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

type DrawerMenuItemProps = {
  Icon: ComponentType<SvgProps>;
  label: string;
  onPress: () => void;
};

function DrawerMenuItem({
  Icon,
  label,
  onPress,
}: DrawerMenuItemProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.pressed,
      ]}
    >
      <Icon height={20} pointerEvents="none" width={20} />
      <Text numberOfLines={1} style={styles.menuLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: drawerTokens.color.overlay,
  },
  backdropTarget: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerShadow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    ...Platform.select({
      web: {
        boxShadow: drawerTokens.shadow.drawerWeb,
      },
      default: {
        shadowColor: drawerTokens.color.shadow,
        shadowOffset: {
          width: drawerTokens.shadow.drawerOffsetX,
          height: drawerTokens.shadow.drawerOffsetY,
        },
        shadowOpacity: drawerTokens.shadow.drawerOpacity,
        shadowRadius: drawerTokens.shadow.drawerRadius,
        elevation: drawerTokens.shadow.drawerElevation,
      },
    }),
  },
  drawerSurface: {
    flex: 1,
    overflow: 'hidden',
    borderTopRightRadius: drawerTokens.layout.cornerRadius,
    borderBottomRightRadius: drawerTokens.layout.cornerRadius,
    backgroundColor: drawerTokens.color.page,
  },
  header: {
    width: '100%',
    paddingRight: drawerTokens.layout.headerHorizontalPadding,
    paddingBottom: drawerTokens.layout.headerBottomPadding,
    paddingLeft: drawerTokens.layout.headerHorizontalPadding,
  },
  userProfile: {
    width: '100%',
    minHeight: drawerTokens.avatar.userSize,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: drawerTokens.spacing.xl,
  },
  userInfo: {
    minWidth: 0,
    flex: 1,
    alignItems: 'flex-start',
  },
  userName: {
    width: '100%',
    color: drawerTokens.color.heading,
    fontFamily: drawerTokens.font.quicksandSemiBold,
    fontSize: drawerTokens.typography.title.fontSize,
    lineHeight: drawerTokens.typography.title.lineHeight,
  },
  memberType: {
    width: '100%',
    color: drawerTokens.color.body,
    fontFamily: drawerTokens.font.jakartaRegular,
    fontSize: drawerTokens.typography.body.fontSize,
    lineHeight: drawerTokens.typography.body.lineHeight,
  },
  memberSince: {
    width: '100%',
    color: drawerTokens.color.body,
    fontFamily: drawerTokens.font.jakartaRegular,
    fontSize: drawerTokens.typography.caption.fontSize,
    lineHeight: drawerTokens.typography.caption.lineHeight,
  },
  body: {
    flex: 1,
    width: '100%',
  },
  bodyContent: {
    alignItems: 'flex-start',
    gap: drawerTokens.layout.bodyGap,
    paddingHorizontal: drawerTokens.layout.bodyHorizontalPadding,
    paddingVertical: drawerTokens.layout.bodyVerticalPadding,
  },
  myPets: {
    width: '100%',
    alignItems: 'center',
  },
  petsHeading: {
    width: '100%',
    paddingHorizontal: drawerTokens.spacing.lg,
  },
  sectionHeading: {
    width: '100%',
    color: drawerTokens.color.heading,
    fontFamily: drawerTokens.font.jakartaSemiBold,
    fontSize: drawerTokens.typography.body.fontSize,
    lineHeight: drawerTokens.typography.body.lineHeight,
  },
  petList: {
    alignItems: 'flex-start',
    gap: drawerTokens.spacing.xl,
    paddingHorizontal: drawerTokens.spacing.md,
    paddingVertical: drawerTokens.spacing.md,
  },
  petScroller: {
    width: '100%',
  },
  menu: {
    maxWidth: '100%',
    alignItems: 'flex-start',
    gap: drawerTokens.spacing.md,
    paddingHorizontal: drawerTokens.spacing.xs,
    paddingVertical: drawerTokens.spacing.lg,
  },
  divider: {
    width: '100%',
    height: drawerTokens.layout.dividerHeight,
    backgroundColor: drawerTokens.color.divider,
  },
  menuItem: {
    width: '100%',
    minHeight: drawerTokens.layout.menuItemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: drawerTokens.spacing.md,
    paddingHorizontal: drawerTokens.spacing.xs,
    paddingVertical: drawerTokens.spacing.lg,
  },
  menuLabel: {
    flexShrink: 1,
    color: drawerTokens.color.heading,
    fontFamily: drawerTokens.font.jakartaMedium,
    fontSize: drawerTokens.typography.menuLabel.fontSize,
    lineHeight: drawerTokens.typography.menuLabel.lineHeight,
    letterSpacing: drawerTokens.typography.menuLabel.letterSpacing,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: drawerTokens.layout.footerTopPadding,
    paddingHorizontal: drawerTokens.layout.footerHorizontalPadding,
    borderTopWidth: 1,
    borderTopColor: drawerTokens.color.footerBorder,
    backgroundColor: drawerTokens.color.footer,
  },
  signOutSlot: {
    position: 'relative',
  },
  signOutContent: {
    minHeight: drawerTokens.layout.footerContentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: drawerTokens.spacing.xl,
  },
  signOutTouchTarget: {
    position: 'absolute',
    top:
      -(
        pawlyTokens.interaction.minimumTouchTarget -
        drawerTokens.layout.footerContentHeight
      ) / 2,
    right: 0,
    bottom:
      -(
        pawlyTokens.interaction.minimumTouchTarget -
        drawerTokens.layout.footerContentHeight
      ) / 2,
    left: 0,
  },
  signOutLabel: {
    color: drawerTokens.color.body,
    fontFamily: drawerTokens.font.jakartaSemiBold,
    fontSize: drawerTokens.typography.body.fontSize,
    lineHeight: drawerTokens.typography.body.lineHeight,
    textAlign: 'center',
  },
  version: {
    color: drawerTokens.color.disabled,
    fontFamily: drawerTokens.font.jakartaRegular,
    fontSize: drawerTokens.typography.caption.fontSize,
    lineHeight: drawerTokens.typography.caption.lineHeight,
  },
  pressed: {
    opacity: drawerTokens.state.pressedOpacity,
  },
});
