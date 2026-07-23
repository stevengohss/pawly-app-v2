import AsyncStorage from '@react-native-async-storage/async-storage';

import type { IntroStep, LaunchStateV1 } from '@/types/launch.types';

const STORAGE_KEY = '@pawly/v2/launch-state/v1';

export const defaultLaunchState: LaunchStateV1 = {
  schemaVersion: 1,
  locale: 'en',
  introStatus: 'not-started',
  introStep: 'moments',
  productOnboardingCompleted: false,
};

export async function loadLaunchState(): Promise<LaunchStateV1> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);

    if (!value) {
      return defaultLaunchState;
    }

    const parsed: unknown = JSON.parse(value);
    return isLaunchStateV1(parsed) ? parsed : defaultLaunchState;
  } catch {
    return defaultLaunchState;
  }
}

export async function persistVisibleIntroStep(step: IntroStep) {
  return updateLaunchState((state) => ({
    ...state,
    introStep: step,
    introStatus:
      state.introStatus === 'completed' ? 'completed' : 'in-progress',
  }));
}

export async function completeIntro(step: IntroStep) {
  return updateLaunchState((state) => ({
    ...state,
    introStep: step,
    introStatus: 'completed',
  }));
}

async function updateLaunchState(
  updater: (state: LaunchStateV1) => LaunchStateV1,
) {
  const current = await loadLaunchState();
  const next = updater(current);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

function isLaunchStateV1(value: unknown): value is LaunchStateV1 {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<LaunchStateV1>;
  return (
    candidate.schemaVersion === 1 &&
    (candidate.locale === 'en' || candidate.locale === 'zh') &&
    (candidate.introStatus === 'not-started' ||
      candidate.introStatus === 'in-progress' ||
      candidate.introStatus === 'completed') &&
    (candidate.introStep === 'moments' ||
      candidate.introStep === 'care' ||
      candidate.introStep === 'explore') &&
    typeof candidate.productOnboardingCompleted === 'boolean'
  );
}
