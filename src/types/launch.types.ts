export type Locale = 'en' | 'zh';
export type IntroStep = 'moments' | 'care' | 'explore';
export type IntroStatus = 'not-started' | 'in-progress' | 'completed';

export type LaunchStateV1 = {
  schemaVersion: 1;
  locale: Locale;
  introStatus: IntroStatus;
  introStep: IntroStep;
  productOnboardingCompleted: boolean;
};
