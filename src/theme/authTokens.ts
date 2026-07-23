import { pawlyTokens } from '@/theme/pawlyTokens';

export const authTokens = {
  color: {
    ...pawlyTokens.color,
    title: '#1a1c1a',
    inputBackground: '#ffffff',
    inputBorder: '#b2b1ae',
    placeholder: '#8d817d',
    icon: '#8d817d',
    error: '#b42318',
  },
  font: pawlyTokens.font,
  screen: {
    width: 402,
    height: 874,
    safeTop: 54,
    headerRowHeight: 56,
    headerHeight: 110,
    footerHeight: 117,
    horizontalPadding: 16,
  },
} as const;
