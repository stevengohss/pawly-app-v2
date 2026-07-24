import type { ComponentType } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';

import AddAction from '../../../assets/figma/navigation/add-action.svg';
import CareActive from '../../../assets/figma/navigation/care-active.svg';
import CareInactive from '../../../assets/figma/navigation/care-inactive.svg';
import ExploreActive from '../../../assets/figma/navigation/explore-active.svg';
import ExploreInactive from '../../../assets/figma/navigation/explore-inactive.svg';
import HomeActive from '../../../assets/figma/navigation/home-active.svg';
import HomeIndicator from '../../../assets/figma/navigation/home-active-indicator.svg';
import HomeInactive from '../../../assets/figma/navigation/home-inactive.svg';
import MomentsActive from '../../../assets/figma/navigation/moments-active.svg';
import MomentsInactive from '../../../assets/figma/navigation/moments-inactive.svg';
import { pawlyTokens } from '@/theme/pawlyTokens';

export type BottomNavigationDestination =
  | 'home'
  | 'moments'
  | 'add'
  | 'care'
  | 'explore';

type BottomNavigationTab = Exclude<BottomNavigationDestination, 'add'>;

type BottomNavigationProps = {
  activeDestination: BottomNavigationTab;
  bottomInset: number;
  labels: Record<BottomNavigationDestination, string>;
  onAddPress: () => void;
  onSelect: (destination: BottomNavigationTab) => void;
};

type NavigationIcon = ComponentType<SvgProps>;

type NavItemProps = {
  active: boolean;
  activeIcon: NavigationIcon;
  inactiveIcon: NavigationIcon;
  label: string;
  onPress: () => void;
};

export const BOTTOM_NAVIGATION_HEIGHT = 107;

const metrics = {
  add: {
    artworkOffsetX: -16,
    artworkOffsetY: -12,
    artworkSize: 87,
    frameOffsetFromMenu: -22,
    frameSize: 55,
  },
  item: {
    activeIconOffset: 4,
    gap: 4,
    height: 75,
    horizontalPadding: 15,
    iconSize: 24,
    verticalPadding: 12.5,
    width: 70,
  },
  menu: {
    groupGap: 8,
    groupWidth: 148,
    horizontalPadding: 16,
    top: 32,
  },
  selectedIndicator: {
    height: 1,
    top: 11.5,
    width: 17,
  },
  surface: {
    bottomRadius: 26,
    bumpSize: 72,
    height: BOTTOM_NAVIGATION_HEIGHT,
    rectangleHeight: 75,
    rectangleTop: 32,
    topRadius: 6,
  },
} as const;

const navigationItems = {
  home: {
    activeIcon: HomeActive,
    inactiveIcon: HomeInactive,
  },
  moments: {
    activeIcon: MomentsActive,
    inactiveIcon: MomentsInactive,
  },
  care: {
    activeIcon: CareActive,
    inactiveIcon: CareInactive,
  },
  explore: {
    activeIcon: ExploreActive,
    inactiveIcon: ExploreInactive,
  },
} satisfies Record<
  BottomNavigationTab,
  { activeIcon: NavigationIcon; inactiveIcon: NavigationIcon }
>;

export function BottomNavigation({
  activeDestination,
  bottomInset,
  labels,
  onAddPress,
  onSelect,
}: BottomNavigationProps) {
  const safeBottom = Math.max(0, bottomInset);

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.container,
        {
          height: BOTTOM_NAVIGATION_HEIGHT + safeBottom,
        },
      ]}
    >
      <NavigationSurface safeBottom={safeBottom} />

      <View style={styles.menuRow}>
        <View style={styles.group}>
          <NavItem
            active={activeDestination === 'home'}
            activeIcon={navigationItems.home.activeIcon}
            inactiveIcon={navigationItems.home.inactiveIcon}
            label={labels.home}
            onPress={() => onSelect('home')}
          />
          <NavItem
            active={activeDestination === 'moments'}
            activeIcon={navigationItems.moments.activeIcon}
            inactiveIcon={navigationItems.moments.inactiveIcon}
            label={labels.moments}
            onPress={() => onSelect('moments')}
          />
        </View>

        <View style={styles.group}>
          <NavItem
            active={activeDestination === 'care'}
            activeIcon={navigationItems.care.activeIcon}
            inactiveIcon={navigationItems.care.inactiveIcon}
            label={labels.care}
            onPress={() => onSelect('care')}
          />
          <NavItem
            active={activeDestination === 'explore'}
            activeIcon={navigationItems.explore.activeIcon}
            inactiveIcon={navigationItems.explore.inactiveIcon}
            label={labels.explore}
            onPress={() => onSelect('explore')}
          />
        </View>
      </View>

      <Pressable
        accessibilityLabel={labels.add}
        accessibilityRole="button"
        hitSlop={8}
        onPress={onAddPress}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.pressed,
        ]}
      >
        <AddAction
          height={metrics.add.artworkSize}
          style={styles.addArtwork}
          width={metrics.add.artworkSize}
        />
      </Pressable>
    </View>
  );
}

function NavigationSurface({ safeBottom }: { safeBottom: number }) {
  return (
    <>
      <View pointerEvents="none" style={styles.shadowSurface}>
        <View style={styles.surfaceBump} />
        <View style={styles.surfaceRectangle} />
      </View>
      {safeBottom > 0 ? (
        <View
          pointerEvents="none"
          style={[styles.safeAreaSurface, { height: safeBottom }]}
        />
      ) : null}
    </>
  );
}

function NavItem({
  active,
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
  label,
  onPress,
}: NavItemProps) {
  const Icon = active ? ActiveIcon : InactiveIcon;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.pressed,
      ]}
    >
      {active ? (
        <View style={styles.indicator}>
          <HomeIndicator
            height={metrics.selectedIndicator.height}
            width={metrics.selectedIndicator.width}
          />
        </View>
      ) : null}
      <View style={[styles.icon, active && styles.activeIcon]}>
        <Icon
          height={metrics.item.iconSize}
          width={metrics.item.iconSize}
        />
      </View>
      <Text style={[styles.label, active && styles.activeLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'visible',
  },
  shadowSurface: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: metrics.surface.height,
    ...Platform.select({
      web: {
        filter: 'drop-shadow(0 -1px 64px rgba(0,0,0,0.15))',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.15,
        shadowRadius: 64,
        elevation: 16,
      },
    }),
  },
  surfaceRectangle: {
    position: 'absolute',
    top: metrics.surface.rectangleTop,
    right: 0,
    left: 0,
    height: metrics.surface.rectangleHeight,
    borderTopLeftRadius: metrics.surface.topRadius,
    borderTopRightRadius: metrics.surface.topRadius,
    borderBottomLeftRadius: metrics.surface.bottomRadius,
    borderBottomRightRadius: metrics.surface.bottomRadius,
    backgroundColor: '#ffffff',
  },
  surfaceBump: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: metrics.surface.bumpSize,
    height: metrics.surface.bumpSize,
    marginLeft: -(metrics.surface.bumpSize / 2),
    borderRadius: metrics.surface.bumpSize / 2,
    backgroundColor: '#ffffff',
  },
  safeAreaSurface: {
    position: 'absolute',
    top: BOTTOM_NAVIGATION_HEIGHT,
    right: 0,
    left: 0,
    backgroundColor: '#ffffff',
  },
  menuRow: {
    position: 'absolute',
    top: metrics.menu.top,
    right: 0,
    left: 0,
    height: metrics.item.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.menu.horizontalPadding,
  },
  group: {
    width: metrics.menu.groupWidth,
    height: metrics.item.height,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: metrics.menu.groupGap,
  },
  item: {
    width: metrics.item.width,
    height: metrics.item.height,
    alignItems: 'center',
    paddingHorizontal: metrics.item.horizontalPadding,
    paddingVertical: metrics.item.verticalPadding,
  },
  indicator: {
    position: 'absolute',
    top: metrics.selectedIndicator.top,
    width: metrics.selectedIndicator.width,
    height: metrics.selectedIndicator.height,
  },
  icon: {
    width: metrics.item.iconSize,
    height: metrics.item.iconSize,
  },
  activeIcon: {
    marginTop: metrics.item.activeIconOffset,
  },
  label: {
    marginTop: metrics.item.gap,
    color: pawlyTokens.color.caption,
    fontFamily: pawlyTokens.font.jakartaSemiBold,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 15.96,
    letterSpacing: 0.06,
    textAlign: 'center',
  },
  activeLabel: {
    color: pawlyTokens.color.action,
  },
  addButton: {
    position: 'absolute',
    top:
      metrics.menu.top +
      metrics.add.frameOffsetFromMenu,
    left: '50%',
    width: metrics.add.frameSize,
    height: metrics.add.frameSize,
    marginLeft: -(metrics.add.frameSize / 2),
    overflow: 'visible',
  },
  addArtwork: {
    position: 'absolute',
    top: metrics.add.artworkOffsetY,
    left: metrics.add.artworkOffsetX,
  },
  pressed: {
    opacity: 0.65,
  },
});
