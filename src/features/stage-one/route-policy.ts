import type { Href } from 'expo-router';

import type { IntroStep, LaunchStateV1 } from '@/lib/launch-state';

export type StageOneScenario =
  | 'first-time'
  | 'resume-moments'
  | 'resume-care'
  | 'resume-explore';

let developmentScenarioActive = false;

export function resolveStageOneRoute(
  state: LaunchStateV1,
  hasSession: boolean,
  scenario?: string,
) {
  const override = __DEV__ ? parseScenario(scenario) : undefined;
  developmentScenarioActive = Boolean(override);

  if (override === 'first-time' || override === 'resume-moments') {
    return onboardingRoute('moments');
  }

  if (override === 'resume-care') {
    return onboardingRoute('care');
  }

  if (override === 'resume-explore') {
    return onboardingRoute('explore');
  }

  if (state.introStatus === 'not-started') {
    return onboardingRoute('moments');
  }

  if (state.introStatus === 'in-progress') {
    return onboardingRoute(state.introStep);
  }

  return {
    pathname: '/auth/welcome' as const,
    params: hasSession ? { authenticatedFallback: '1' } : {},
  } as Href;
}

export function isDevelopmentScenarioActive() {
  return __DEV__ && developmentScenarioActive;
}

function onboardingRoute(step: IntroStep) {
  return {
    pathname: '/onboarding' as const,
    params: { step },
  } as Href;
}

function parseScenario(value?: string): StageOneScenario | undefined {
  if (
    value === 'first-time' ||
    value === 'resume-moments' ||
    value === 'resume-care' ||
    value === 'resume-explore'
  ) {
    return value;
  }

  return undefined;
}
