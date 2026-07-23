import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import { resolveLaunchRoute } from '@/features/launch/state/launchResolver';
import { loadLaunchState } from '@/features/launch/state/launchStateStorage';
import { supabase } from '@/lib/supabaseClient';

const splashLogo = require('../../../../assets/figma/brand/splash-logo.png');
const momentsHero = require('../../../../assets/figma/onboarding/intro/moments-hero.png');
const careHero = require('../../../../assets/figma/onboarding/intro/care-hero.png');
const exploreHero = require('../../../../assets/figma/onboarding/intro/explore-hero.png');
const welcomeBackground = require('../../../../assets/figma/auth/welcome-background.png');
const petAvatar = require('../../../../assets/figma/auth/pet-avatar.png');
const homeAvatar = require('../../../../assets/figma/user/home-avatar.jpg');

const minimumDisplayMs = 1_000;

type BootstrapAppOptions = {
  launchScenario?: string;
  onMilestone: (target: number, duration?: number) => void;
};

type SessionRestoreResult =
  | { status: 'restored'; hasSession: boolean }
  | { status: 'unconfigured' | 'timed-out' | 'failed'; hasSession: false };

export async function bootstrapApp({
  launchScenario,
  onMilestone,
}: BootstrapAppOptions) {
  const startedAt = Date.now();
  onMilestone(0.14, 180);

  const track = async <T,>(promise: Promise<T>, target: number): Promise<T> => {
    const result = await promise;
    onMilestone(target);
    return result;
  };

  const fonts = track(
    Font.loadAsync({
      PlusJakartaSans_400Regular,
      PlusJakartaSans_500Medium,
      PlusJakartaSans_600SemiBold,
      PlusJakartaSans_700Bold,
      Quicksand_400Regular,
      Quicksand_600SemiBold,
    }),
    0.34,
  );
  const assets = track(
    Asset.loadAsync([
      splashLogo,
      momentsHero,
      careHero,
      exploreHero,
      welcomeBackground,
      petAvatar,
      homeAvatar,
    ]),
    0.54,
  );
  const state = track(loadLaunchState(), 0.74);
  const session = track(restoreSessionWithTimeout(), 0.9);

  const [stateResult, , , sessionResult] = await Promise.all([
    state,
    fonts.catch(() => undefined),
    assets.catch(() => undefined),
    session,
  ]);

  const remaining = minimumDisplayMs - (Date.now() - startedAt);
  if (remaining > 0) {
    await delay(remaining);
  }

  onMilestone(0.95, 180);
  await delay(180);

  return resolveLaunchRoute(
    stateResult,
    sessionResult.status === 'restored' && sessionResult.hasSession,
    launchScenario,
  );
}

async function restoreSessionWithTimeout(
  timeoutMs = 1_500,
): Promise<SessionRestoreResult> {
  if (!supabase) {
    return { status: 'unconfigured', hasSession: false };
  }

  const restore = supabase.auth
    .getSession()
    .then(({ data, error }): SessionRestoreResult => {
      if (error) {
        return { status: 'failed', hasSession: false };
      }

      return { status: 'restored', hasSession: Boolean(data.session) };
    })
    .catch((): SessionRestoreResult => ({
      status: 'failed',
      hasSession: false,
    }));

  const timeout = new Promise<SessionRestoreResult>((resolve) => {
    setTimeout(
      () => resolve({ status: 'timed-out', hasSession: false }),
      timeoutMs,
    );
  });

  return Promise.race([restore, timeout]);
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
