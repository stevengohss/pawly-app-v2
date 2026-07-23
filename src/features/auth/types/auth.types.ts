import type { Session } from '@supabase/supabase-js';

export type AuthActionResult =
  | { status: 'authenticated'; session: Session }
  | { status: 'confirmation-required' }
  | { status: 'error'; message: string };
