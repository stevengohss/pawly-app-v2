import { Image, type ImageSource } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

type UserAvatarProps = {
  accessibilityLabel: string;
  source: ImageSource | number;
};

export function UserAvatar({
  accessibilityLabel,
  source,
}: UserAvatarProps) {
  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      style={styles.frame}
    >
      <Image contentFit="cover" source={source} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    padding: 2,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        boxShadow:
          '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        elevation: 4,
      },
    }),
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 4,
  },
});
