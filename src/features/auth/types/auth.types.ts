import type { Session } from '@supabase/supabase-js';

export type AuthActionResult =
  | { status: 'authenticated'; session: Session }
  | { status: 'confirmation-required' }
  | { status: 'error'; message: string };

export type SignOutResult =
  | { status: 'signed-out' }
  | { status: 'error'; message: string };
