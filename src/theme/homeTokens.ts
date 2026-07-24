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
  component: {
    insight: {
      buttonHeight: 40,
      buttonWidth: 142,
      height: 272,
    },
    navigation: {
      activeIconOffset: 4,
      addButtonOffset: -34,
      addButtonSize: 87,
      height: 107,
      iconSize: 24,
      indicatorHeight: 1,
      indicatorTop: 11.5,
      indicatorWidth: 17,
      itemVerticalPadding: 12.5,
      labelGap: 4,
      menuHeight: 75,
      menuHorizontalPadding: 16,
      menuTop: 32,
      surfaceFillTop: 32,
    },
    quickActions: {
      height: 160,
      iconSize: 48,
    },
    todayCare: {
      actionSize: 32,
      headerHeight: 32,
      height: 288,
      iconSize: 48,
      listHeight: 240,
      rowHeight: 80,
    },
  },
  screen: {
    referenceWidth: 402,
    referenceHeight: 1001,
    safeTop: 54,
    headerRowHeight: 56,
    contentHorizontalPadding: 12,
    contentVerticalPadding: 16,
    contentGap: 16,
  },
} as const;
