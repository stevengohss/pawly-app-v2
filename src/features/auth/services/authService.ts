import type { AuthError } from '@supabase/supabase-js';

import type { AuthActionResult } from '@/features/auth/types/auth.types';
import { en } from '@/i18n/en';
import { supabase } from '@/lib/supabaseClient';

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthActionResult> {
  if (!supabase) {
    return { status: 'error', message: en.auth.validation.unavailable };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { status: 'error', message: authErrorMessage(error) };
  }

  if (!data.session) {
    return { status: 'error', message: en.auth.validation.generic };
  }

  return { status: 'authenticated', session: data.session };
}

export async function signUpWithEmail(input: {
  email: string;
  fullName: string;
  password: string;
}): Promise<AuthActionResult> {
  if (!supabase) {
    return { status: 'error', message: en.auth.validation.unavailable };
  }

  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
      },
    },
  });

  if (error) {
    return { status: 'error', message: authErrorMessage(error) };
  }

  if (data.session) {
    return { status: 'authenticated', session: data.session };
  }

  return { status: 'confirmation-required' };
}

function authErrorMessage(error: AuthError) {
  const normalized = `${error.code ?? ''} ${error.message}`.toLowerCase();

  if (
    normalized.includes('invalid login') ||
    normalized.includes('invalid credentials')
  ) {
    return en.auth.validation.invalidCredentials;
  }

  if (
    normalized.includes('already registered') ||
    normalized.includes('user_already_exists')
  ) {
    return en.auth.validation.emailInUse;
  }

  return en.auth.validation.generic;
}
