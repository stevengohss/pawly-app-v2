import { useCallback } from 'react';
import { useRouter } from 'expo-router';

import { isDevelopmentScenarioActive } from '@/features/stage-one/route-policy';
import {
  completeIntro,
  persistVisibleIntroStep,
  type IntroStep,
} from '@/lib/launch-state';

export function useIntroPersistence() {
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
