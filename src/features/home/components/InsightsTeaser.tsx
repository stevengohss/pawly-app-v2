import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import InsightPattern from '../../../../assets/figma/home/insight-pattern.svg';
import { Button } from '@/components/actions/Button';
import { en } from '@/i18n/en';
import { homeTokens } from '@/theme/homeTokens';

type InsightsTeaserProps = {
  onPress: () => void;
};

export function InsightsTeaser({ onPress }: InsightsTeaserProps) {
  return (
    <View style={styles.card}>
      <InsightPattern
        height={160}
        style={styles.pattern}
        width={160}
      />
      <View style={styles.contents}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{en.home.insight.badge}</Text>
        </View>
        <Text style={styles.heading}>{en.home.insight.heading}</Text>
        <Text style={styles.body}>{en.home.insight.body}</Text>
        <Button
          label={en.home.insight.action}
          onPress={onPress}
          showArrow={false}
          style={styles.button}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 272,
    overflow: 'hidden',
    padding: 24,
    borderRadius: 24,
    backgroundColor: homeTokens.color.deepPrimary,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(217,119,87,0.08)',
      },
      default: {
        shadowColor: '#d97757',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      },
    }),
  },
  pattern: {
    position: 'absolute',
    right: -40,
    bottom: -40,
  },
  contents: {
    width: '100%',
    gap: 8,
    paddingTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: homeTokens.color.onDeepPrimary,
    fontFamily: homeTokens.font.jakartaRegular,
    fontSize: 12,
    lineHeight: 14.4,
  },
  heading: {
    color: homeTokens.color.onDeepPrimary,
    fontFamily: homeTokens.font.quicksandSemiBold,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 31.92,
  },
  body: {
    color: homeTokens.color.onDeepPrimary,
    fontFamily: homeTokens.font.jakartaSemiBold,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    opacity: 0.9,
  },
  button: {
    width: 142,
    height: 40,
    alignSelf: 'flex-start',
    marginTop: 0,
    paddingHorizontal: 20,
  },
});
