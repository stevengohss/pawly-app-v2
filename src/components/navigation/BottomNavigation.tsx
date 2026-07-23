import type { ComponentType } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AddAction from '../../../assets/figma/navigation/add-action.svg';
import BottomNavSurface from '../../../assets/figma/navigation/bottom-nav-surface.svg';
import CareHand from '../../../assets/figma/navigation/care-icon-hand.svg';
import CareHeart from '../../../assets/figma/navigation/care-icon-heart.svg';
import ExploreCircle from '../../../assets/figma/navigation/explore-icon-circle.svg';
import ExploreNeedle from '../../../assets/figma/navigation/explore-icon-needle.svg';
import HomeIndicator from '../../../assets/figma/navigation/home-active-indicator.svg';
import HomeBody from '../../../assets/figma/navigation/home-icon-body.svg';
import HomeDetail from '../../../assets/figma/navigation/home-icon-detail.svg';
import HomeHighlight from '../../../assets/figma/navigation/home-icon-highlight.svg';
import HomeRoof from '../../../assets/figma/navigation/home-icon-roof.svg';
import MomentsDot from '../../../assets/figma/navigation/moments-icon-dot.svg';
import MomentsFrame from '../../../assets/figma/navigation/moments-icon-frame.svg';
import MomentsImage from '../../../assets/figma/navigation/moments-icon-image.svg';
import MomentsTop from '../../../assets/figma/navigation/moments-icon-top.svg';
import { pawlyTokens } from '@/theme/pawlyTokens';

export type BottomNavigationDestination =
  | 'home'
  | 'moments'
  | 'add'
  | 'care'
  | 'explore';

type BottomNavigationProps = {
  activeDestination: Exclude<BottomNavigationDestination, 'add'>;
  bottomInset: number;
  labels: Record<BottomNavigationDestination, string>;
  onSelect: (destination: BottomNavigationDestination) => void;
};

type NavItemProps = {
  active?: boolean;
  icon: ComponentType;
  label: string;
  onPress: () => void;
};

export function BottomNavigation({
  activeDestination,
  bottomInset,
  labels,
  onSelect,
}: BottomNavigationProps) {
  const safeBottom = Math.max(0, bottomInset);

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.container, { height: 107 + safeBottom }]}
    >
      <View style={styles.shadowSurface}>
        <BottomNavSurface height={107} width="100%" />
      </View>
      {safeBottom > 0 ? (
        <View style={[styles.safeAreaFill, { height: safeBottom }]} />
      ) : null}

      <View style={styles.menuRow}>
        <View style={styles.group}>
          <NavItem
            active={activeDestination === 'home'}
            icon={HomeNavigationIcon}
            label={labels.home}
            onPress={() => onSelect('home')}
          />
          <NavItem
            active={activeDestination === 'moments'}
            icon={MomentsNavigationIcon}
            label={labels.moments}
            onPress={() => onSelect('moments')}
          />
        </View>
        <View style={styles.group}>
          <NavItem
            active={activeDestination === 'care'}
            icon={CareNavigationIcon}
            label={labels.care}
            onPress={() => onSelect('care')}
          />
          <NavItem
            active={activeDestination === 'explore'}
            icon={ExploreNavigationIcon}
            label={labels.explore}
            onPress={() => onSelect('explore')}
          />
        </View>
      </View>

      <Pressable
        accessibilityLabel={labels.add}
        accessibilityRole="button"
        onPress={() => onSelect('add')}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.pressed,
        ]}
      >
        <AddAction height={87} width={87} />
      </Pressable>
    </View>
  );
}

function NavItem({
  active,
  icon: Icon,
  label,
  onPress,
}: NavItemProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="tab"
      accessibilityState={{ selected: Boolean(active) }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.pressed,
      ]}
    >
      {active ? (
        <View style={styles.indicator}>
          <HomeIndicator height={1} width={17} />
        </View>
      ) : null}
      <View style={[styles.icon, active && styles.activeIcon]}>
        <Icon />
      </View>
      <Text style={[styles.label, active && styles.activeLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

function HomeNavigationIcon() {
  return (
    <View style={styles.iconCanvas}>
      <HomeRoof height={19.658} style={styles.homeRoof} width={21.5} />
      <HomeDetail height={2.5} style={styles.homeDetail} width={2.5} />
      <HomeBody height={8} style={styles.homeBody} width={7.5} />
      <HomeHighlight
        height={4.64}
        style={styles.homeHighlight}
        width={3.5}
      />
    </View>
  );
}

function MomentsNavigationIcon() {
  return (
    <View style={styles.iconCanvas}>
      <MomentsFrame
        height={17.5}
        style={styles.momentsFrame}
        width={21.5}
      />
      <MomentsTop
        height={3.84}
        style={styles.momentsTop}
        width={17.339}
      />
      <MomentsDot
        height={4.5}
        style={styles.momentsDot}
        width={4.5}
      />
      <MomentsImage
        height={9.602}
        style={styles.momentsImage}
        width={20.5}
      />
    </View>
  );
}

function CareNavigationIcon() {
  return (
    <View style={styles.iconCanvas}>
      <CareHeart
        height={9.177}
        style={styles.careHeart}
        width={11.5}
      />
      <CareHand height={8.5} style={styles.careHand} width={18.502} />
    </View>
  );
}

function ExploreNavigationIcon() {
  return (
    <View style={styles.iconCanvas}>
      <ExploreCircle
        height={21.5}
        style={styles.exploreCircle}
        width={21.5}
      />
      <ExploreNeedle
        height={8.842}
        style={styles.exploreNeedle}
        width={8.842}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 402,
  },
  shadowSurface: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 107,
    ...Platform.select({
      web: {
        filter: 'drop-shadow(0 -1px 32px rgba(0,0,0,0.15))',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.15,
        shadowRadius: 32,
        elevation: 16,
      },
    }),
  },
  safeAreaFill: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#ffffff',
  },
  menuRow: {
    position: 'absolute',
    top: 32,
    right: 0,
    left: 0,
    height: 75,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  item: {
    width: 70,
    height: 75,
    alignItems: 'center',
    paddingVertical: 12.5,
  },
  indicator: {
    position: 'absolute',
    top: 11.5,
    width: 17,
    height: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    marginTop: 4,
  },
  iconCanvas: {
    position: 'relative',
    width: 24,
    height: 24,
  },
  label: {
    marginTop: 4,
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
    top: -34,
    left: '50%',
    width: 87,
    height: 87,
    marginLeft: -43,
  },
  pressed: {
    opacity: 0.65,
  },
  homeRoof: { position: 'absolute', top: 3.092, left: 1.25 },
  homeDetail: { position: 'absolute', top: 8.251, left: 10.75 },
  homeBody: { position: 'absolute', top: 13.251, left: 8.25 },
  homeHighlight: { position: 'absolute', top: 3, left: 15.5 },
  momentsFrame: { position: 'absolute', top: 4.688, left: 1.25 },
  momentsTop: { position: 'absolute', top: 2.25, left: 3.331 },
  momentsDot: { position: 'absolute', top: 8.438, left: 16 },
  momentsImage: { position: 'absolute', top: 11.835, left: 1.25 },
  careHeart: { position: 'absolute', top: 2, left: 6.25 },
  careHand: { position: 'absolute', top: 15, left: 4 },
  exploreCircle: { position: 'absolute', top: 1.25, left: 1.25 },
  exploreNeedle: { position: 'absolute', top: 8.328, left: 8.33 },
});
