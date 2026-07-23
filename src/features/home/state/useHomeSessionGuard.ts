import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

type SessionGuardState = 'checking' | 'authorized';

export function useHomeSessionGuard(bypass: boolean) {
  const router = useRouter();
  const [state, setState] = useState<SessionGuardState>(
    bypass ? 'authorized' : 'checking',
  );

  useEffect(() => {
    if (bypass) {
      setState('authorized');
      return;
    }

    if (!supabase) {
      router.replace('/auth/welcome');
      return;
    }

    let active = true;
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved && active) {
        router.replace('/auth/welcome');
      }
    }, 1_500);

    void supabase.auth.getSession().then(({ data, error }) => {
      resolved = true;
      clearTimeout(timeout);

      if (!active) {
        return;
      }

      if (error || !data.session) {
        router.replace('/auth/welcome');
        return;
      }

      setState('authorized');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active && !session) {
        router.replace('/auth/welcome');
      }
    });

    return () => {
      active = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [bypass, router]);

  return state;
}
