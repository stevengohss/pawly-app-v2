import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import QuickFeeding from '../../../../assets/figma/home/quick-feeding.svg';
import QuickMeds from '../../../../assets/figma/home/quick-meds.svg';
import { en } from '@/i18n/en';
import { homeTokens } from '@/theme/homeTokens';

type QuickActionGridProps = {
  onFeeding: () => void;
  onMeds: () => void;
};

export function QuickActionGrid({
  onFeeding,
  onMeds,
}: QuickActionGridProps) {
  return (
    <View style={styles.grid}>
      <QuickActionCard
        detail={en.home.quickActions.medsDetail}
        icon={
          <QuickMeds height={18} width={14} />
        }
        iconBackground={homeTokens.color.softPrimary}
        label={en.home.quickActions.meds}
        onPress={onMeds}
      />
      <QuickActionCard
        detail={en.home.quickActions.feedingDetail}
        gradient
        icon={
          <QuickFeeding height={20} width={15} />
        }
        iconBackground={homeTokens.color.softGreen}
        label={en.home.quickActions.feeding}
        onPress={onFeeding}
      />
    </View>
  );
}

type QuickActionCardProps = {
  detail: string;
  gradient?: boolean;
  icon: ReactNode;
  iconBackground: string;
  label: string;
  onPress: () => void;
};

function QuickActionCard({
  detail,
  gradient,
  icon,
  iconBackground,
  label,
  onPress,
}: QuickActionCardProps) {
  const contents = (
    <>
      <View style={[styles.iconBackground, { backgroundColor: iconBackground }]}>
        {icon}
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </>
  );

  return (
    <Pressable
      accessibilityLabel={`${label}. ${detail}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        !gradient && styles.whiteCard,
        pressed && styles.pressed,
      ]}
    >
      {gradient ? (
        <LinearGradient
          colors={['#ffffff', homeTokens.color.softPrimary]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {contents}
    </Pressable>
  );
}

const cardShadow = Platform.select({
  web: {
    boxShadow: '0 4px 6px rgba(217,119,87,0.08)',
  },
  default: {
    shadowColor: '#d97757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    height: 160,
    flexDirection: 'row',
    gap: 16,
  },
  card: {
    minWidth: 0,
    flex: 1,
    height: 160,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 24,
    ...cardShadow,
  },
  whiteCard: {
    backgroundColor: homeTokens.color.white,
  },
  iconBackground: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  label: {
    color: homeTokens.color.neutralText,
    fontFamily: homeTokens.font.quicksandRegular,
    fontSize: 18,
    lineHeight: 27,
  },
  detail: {
    color: homeTokens.color.body,
    fontFamily: homeTokens.font.jakartaMedium,
    fontSize: 12,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.72,
  },
});
