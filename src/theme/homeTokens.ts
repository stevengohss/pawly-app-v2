import { pawlyTokens } from '@/theme/pawlyTokens';

export const homeTokens = {
  color: {
    ...pawlyTokens.color,
    neutralText: '#1a1c1a',
    deepPrimary: '#99462a',
    onDeepPrimary: '#eeecec',
    white: '#ffffff',
    softPrimary: '#fdece8',
    softGreen: '#c6edc4',
    softNeutral: '#efeeeb',
  },
  font: pawlyTokens.font,
  screen: {
    referenceWidth: 402,
    referenceHeight: 1001,
    safeTop: 54,
    headerRowHeight: 56,
    contentHorizontalPadding: 12,
    contentGap: 16,
    bottomNavigationHeight: 107,
  },
} as const;
