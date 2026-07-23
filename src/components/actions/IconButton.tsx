import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type IconButtonProps = {
  accessibilityLabel: string;
  children: ReactNode;
  onPress: () => void;
};

export function IconButton({
  accessibilityLabel,
  children,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
  },
  pressed: {
    opacity: 0.65,
  },
});
