import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { OnboardingPager } from '@/components/stage-one/onboarding-pager';
import type { IntroStep } from '@/lib/launch-state';

export default function OnboardingRoute() {
  const router = useRouter();
  const { step: stepParam } = useLocalSearchParams<{
    step?: string | string[];
  }>();
  const rawStep = Array.isArray(stepParam) ? stepParam[0] : stepParam;
  const initialStep = parseStep(rawStep);

  useEffect(() => {
    if (rawStep !== initialStep) {
      router.setParams({ step: initialStep });
    }
  }, [initialStep, rawStep, router]);

  return <OnboardingPager initialStep={initialStep} />;
}

function parseStep(value?: string): IntroStep {
  if (value === 'care' || value === 'explore') {
    return value;
  }

  return 'moments';
}
