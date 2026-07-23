import type { ImageSource } from 'expo-image';

import type { IntroStep } from '@/types/launch.types';

const momentsHero = require('../../../../assets/figma/onboarding/intro/moments-hero.png');
const careHero = require('../../../../assets/figma/onboarding/intro/care-hero.png');
const exploreHero = require('../../../../assets/figma/onboarding/intro/explore-hero.png');

export type IntroOnboardingStep = {
  body: string;
  bodyMaxWidth: number;
  heading: string;
  headingMaxWidth: number;
  hero: ImageSource;
  heroExportHeight: number;
  heroExportWidth: number;
  heroOffsetX?: number;
  heroOffsetY?: number;
  id: IntroStep;
};

export const introSteps: readonly IntroOnboardingStep[] = [
  {
    id: 'moments',
    heading: 'Preserve every little moment',
    headingMaxWidth: 320,
    body: "From first walks to quiet cuddles, Pawly helps you keep your pet's story beautifully in one place.",
    bodyMaxWidth: 305,
    hero: momentsHero,
    heroExportHeight: 378,
    heroExportWidth: 386,
    heroOffsetX: 0,
    heroOffsetY: 0,
  },
  {
    id: 'care',
    heading: 'Care made easier every day',
    headingMaxWidth: 300,
    body: 'Track check-ins, reminders, meals, health notes, and daily routines without losing the warmth of being a pet parent.',
    bodyMaxWidth: 340,
    hero: careHero,
    heroExportHeight: 510,
    heroExportWidth: 402,
  },
  {
    id: 'explore',
    heading: 'Belong to a kinder pet community',
    headingMaxWidth: 340,
    body: 'Meet nearby pet parents, share trusted advice, and find support when your pet life needs more than an app.',
    bodyMaxWidth: 305,
    hero: exploreHero,
    heroExportHeight: 430,
    heroExportWidth: 402,
  },
];

export const introStepIndex: Record<IntroStep, number> = {
  moments: 0,
  care: 1,
  explore: 2,
};

export function parseIntroStep(value?: string): IntroStep {
  if (value === 'care' || value === 'explore') {
    return value;
  }

  return 'moments';
}
