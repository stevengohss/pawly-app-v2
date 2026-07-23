import type { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import { pawlyTokens } from '@/theme/pawlyTokens';

type FooterCTAProps = {
  bottomInset: number;
  children: ReactNode;
  fixed?: boolean;
  onLayout: (event: LayoutChangeEvent) => void;
};

export function FooterCTA({
  bottomInset,
  children,
  fixed,
  onLayout,
}: FooterCTAProps) {
  return (
    <View
      onLayout={onLayout}
      style={[
        styles.footer,
        fixed && styles.fixed,
        { paddingBottom: Math.max(20, bottomInset) },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    flexShrink: 0,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: pawlyTokens.color.page,
  },
  fixed: {
    position: 'absolute',
    zIndex: 4,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
