import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';

import {
  IntroOnboardingScreen,
  parseIntroStep,
} from '@/features/onboarding/intro';

export default function OnboardingRoute() {
  const router = useRouter();
  const { step: stepParam } = useLocalSearchParams<{
    step?: string | string[];
  }>();
  const rawStep = Array.isArray(stepParam) ? stepParam[0] : stepParam;
  const initialStep = parseIntroStep(rawStep);

  useEffect(() => {
    if (rawStep !== initialStep) {
      router.setParams({ step: initialStep });
    }
  }, [initialStep, rawStep, router]);

  return <IntroOnboardingScreen initialStep={initialStep} />;
}
