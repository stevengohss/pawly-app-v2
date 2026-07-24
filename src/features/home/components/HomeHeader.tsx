import type { Ref } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import BellBody from '../../../../assets/figma/actions/bell-body.svg';
import BellClapper from '../../../../assets/figma/actions/bell-clapper.svg';
import SearchHandle from '../../../../assets/figma/actions/search-handle.svg';
import SearchRing from '../../../../assets/figma/actions/search-ring.svg';
import { IconButton } from '@/components/actions/IconButton';
import { PageHeader } from '@/components/navigation/PageHeader';
import { UserAvatar } from '@/components/user/UserAvatar';
import { en } from '@/i18n/en';
import { homeTokens } from '@/theme/homeTokens';

const homeAvatar = require('../../../../assets/figma/user/home-avatar.jpg');

type HomeHeaderProps = {
  avatarRef?: Ref<View>;
  onNotifications: () => void;
  onProfile: () => void;
  onSearch: () => void;
  safeTop: number;
};

export function HomeHeader({
  avatarRef,
  onNotifications,
  onProfile,
  onSearch,
  safeTop,
}: HomeHeaderProps) {
  return (
    <View
      style={[
        styles.container,
        {
          height: safeTop + homeTokens.screen.headerRowHeight,
          paddingTop: safeTop,
        },
      ]}
    >
      <PageHeader
        leading={
          <Pressable
            accessibilityLabel={en.home.accessibility.avatar}
            accessibilityRole="button"
            hitSlop={4}
            onPress={onProfile}
            ref={avatarRef}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <UserAvatar
              accessibilityLabel={en.home.accessibility.avatar}
              source={homeAvatar}
            />
          </Pressable>
        }
        rightActions={
          <>
            <IconButton
              accessibilityLabel={en.home.accessibility.search}
              onPress={onSearch}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              accessibilityLabel={en.home.accessibility.notifications}
              onPress={onNotifications}
            >
              <BellIcon />
            </IconButton>
          </>
        }
        title={en.home.header.title}
        variant="contextual"
      />
    </View>
  );
}

function SearchIcon() {
  return (
    <View style={styles.iconCanvas}>
      <SearchRing height={17.333} style={styles.searchRing} width={17.333} />
      <SearchHandle
        height={4.417}
        style={styles.searchHandle}
        width={4.417}
      />
    </View>
  );
}

function BellIcon() {
  return (
    <View style={styles.iconCanvas}>
      <BellBody height={15.667} style={styles.bellBody} width={16.498} />
      <BellClapper
        height={4}
        style={styles.bellClapper}
        width={9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'visible',
    backgroundColor: homeTokens.color.page,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
      },
    }),
  },
  iconCanvas: {
    position: 'relative',
    width: 20,
    height: 20,
  },
  searchRing: {
    position: 'absolute',
    top: 0.917,
    left: 0.917,
  },
  searchHandle: {
    position: 'absolute',
    top: 14.667,
    left: 14.667,
  },
  bellBody: {
    position: 'absolute',
    top: 0.917,
    left: 1.751,
  },
  bellClapper: {
    position: 'absolute',
    top: 15.083,
    left: 5.5,
  },
  pressed: {
    opacity: 0.65,
  },
});
