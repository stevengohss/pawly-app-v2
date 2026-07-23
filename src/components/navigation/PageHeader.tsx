import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BackArrow from '../../../assets/figma/navigation/back-arrow.svg';
import { PawlyWordmark } from '@/components/brand/PawlyWordmark';
import { pawlyTokens } from '@/theme/pawlyTokens';

type BrandPageHeaderProps = {
  appName: string;
  backgroundColor?: string;
  backAccessibilityLabel: string;
  centerAlignment?: 'center' | 'start';
  onBack?: () => void;
  rightAction?: ReactNode;
  sideOffsetY?: number;
  sideSlotWidth?: number;
  variant?: 'brand';
};

type ContextualPageHeaderProps = {
  backgroundColor?: string;
  leading: ReactNode;
  rightActions?: ReactNode;
  title: string;
  variant: 'contextual';
};

export function PageHeader({
  ...props
}: BrandPageHeaderProps | ContextualPageHeaderProps) {
  if (props.variant === 'contextual') {
    const {
      backgroundColor = pawlyTokens.color.page,
      leading,
      rightActions,
      title,
    } = props;

    return (
      <View style={[styles.contextualHeader, { backgroundColor }]}>
        <View style={styles.contextualTitle}>
          {leading}
          <Text numberOfLines={1} style={styles.titleText}>
            {title}
          </Text>
        </View>
        <View style={styles.contextualActions}>{rightActions}</View>
      </View>
    );
  }

  const {
    appName,
    backgroundColor = pawlyTokens.color.page,
    backAccessibilityLabel,
    centerAlignment = 'center',
    onBack,
    rightAction,
    sideOffsetY = 0,
    sideSlotWidth = 59,
  } = props;

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View
        style={[
          styles.sideSlot,
          { top: sideOffsetY, width: sideSlotWidth },
        ]}
      >
        {onBack ? (
          <Pressable
            accessibilityLabel={backAccessibilityLabel}
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

      <View
        style={[
          styles.center,
          centerAlignment === 'start' && styles.centerStart,
        ]}
      >
        <PawlyWordmark accessibilityLabel={appName} />
      </View>

      <View
        style={[
          styles.sideSlot,
          styles.rightSlot,
          { top: sideOffsetY, width: sideSlotWidth },
        ]}
      >
        {rightAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  sideSlot: {
    position: 'relative',
    height: 56,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSlot: {
    alignItems: 'flex-end',
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  centerStart: {
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: pawlyTokens.color.action,
    borderRadius: 48,
  },
  pressed: {
    opacity: 0.65,
  },
  contextualHeader: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  contextualTitle: {
    minWidth: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contextualActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    flexShrink: 1,
    color: pawlyTokens.color.heading,
    fontFamily: pawlyTokens.font.quicksandSemiBold,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 37.24,
  },
});
