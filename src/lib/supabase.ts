import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: false,
          persistSession: true,
          storage: AsyncStorage,
        },
      })
    : null;

export type SessionRestoreResult =
  | { status: 'restored'; hasSession: boolean }
  | { status: 'unconfigured' | 'timed-out' | 'failed'; hasSession: false };

export async function restoreSessionWithTimeout(
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
