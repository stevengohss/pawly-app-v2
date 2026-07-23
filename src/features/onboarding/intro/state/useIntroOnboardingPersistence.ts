import { useCallback } from 'react';
import { useRouter } from 'expo-router';

import { isDevelopmentScenarioActive } from '@/features/launch/state/launchResolver';
import {
  completeIntro,
  persistVisibleIntroStep,
} from '@/features/launch/state/launchStateStorage';
import type { IntroStep } from '@/types/launch.types';

export function useIntroOnboardingPersistence() {
  const router = useRouter();

  const persistStep = useCallback(async (step: IntroStep) => {
    if (!isDevelopmentScenarioActive()) {
      await persistVisibleIntroStep(step);
    }
  }, []);

  const finishIntro = useCallback(async (step: IntroStep) => {
    if (!isDevelopmentScenarioActive()) {
      await completeIntro(step);
    }
    router.replace('/auth/welcome');
  }, [router]);

  return { finishIntro, persistStep };
}
