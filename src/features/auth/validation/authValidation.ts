import { en } from '@/i18n/en';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string) {
  const email = value.trim();

  if (!email) {
    return en.auth.validation.requiredEmail;
  }

  if (!emailPattern.test(email)) {
    return en.auth.validation.invalidEmail;
  }

  return undefined;
}

export function validateName(value: string) {
  return value.trim() ? undefined : en.auth.validation.requiredName;
}

export function validatePassword(value: string) {
  if (!value) {
    return en.auth.validation.requiredPassword;
  }

  return value.length >= 8 ? undefined : en.auth.validation.shortPassword;
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string,
) {
  const passwordError = validatePassword(confirmation);

  if (passwordError) {
    return passwordError;
  }

  return password === confirmation
    ? undefined
    : en.auth.validation.passwordMismatch;
}
