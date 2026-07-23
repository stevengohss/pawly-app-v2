export const en = {
  common: {
    appName: 'Pawly',
    back: 'Go back',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
  },
  auth: {
    welcome: {
      heading: 'Welcome to Pawly',
      body: "Your pet's daily companion for care, community, and joy.",
      care: 'Care',
      social: 'Social',
      joy: 'Joy',
      signIn: 'I already have an account',
      noAccount: 'Don’t have an account?',
      signUp: 'Sign Up',
    },
    signIn: {
      heading: 'Welcome back',
      body: 'Sign in to continue your pet’s story.',
      emailLabel: 'Email',
      emailPlaceholder: 'hello@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      passwordHint: 'Must be at least 8 characters',
      forgot: 'Forgot?',
      submit: 'Sign In',
      noAccount: 'Don’t have an account?',
      signUp: 'Sign Up',
    },
    signUp: {
      heading: 'Join the pack',
      body:
        'Start preserving your pet’s most precious moments today.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Your name',
      fullNameHint: 'Hint text',
      emailLabel: 'Email',
      emailPlaceholder: 'hello@example.com',
      emailHint: 'Hint text',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      passwordHint: 'Must be at least 8 characters',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: '••••••••',
      confirmPasswordHint: 'Must match password',
      createAccount: 'Create Account',
      existingAccount: 'Already part of the pack?',
      signIn: 'Sign In',
    },
    trust: {
      community: 'Join over 5,000+ Singaporean pet parents.',
      agreementLead: 'By continuing, you agree to our',
      agreementJoin: 'and',
    },
    validation: {
      requiredName: 'Enter your full name.',
      requiredEmail: 'Enter your email address.',
      invalidEmail: 'Enter a valid email address.',
      requiredPassword: 'Enter your password.',
      shortPassword: 'Password must be at least 8 characters.',
      passwordMismatch: 'Passwords do not match.',
      unavailable:
        'Authentication is not configured on this device. Check the local Expo environment.',
      generic: 'Something went wrong. Please try again.',
      invalidCredentials: 'The email or password is incorrect.',
      emailInUse: 'An account already exists for this email address.',
    },
    alerts: {
      notReadyTitle: 'Coming in a later stage',
      forgot:
        'Password recovery needs an approved reset screen and deep-link flow before it can be enabled.',
      terms:
        'The Terms of Service destination has not been approved yet.',
      privacy:
        'The Privacy Policy destination has not been approved yet.',
      checkEmailTitle: 'Check your email',
      checkEmail:
        'Your account was created. Confirm your email, then return to Pawly to sign in.',
      authenticatedTitle: 'Authentication successful',
      authenticated:
        'Your session is ready. Home will replace this temporary Stage 2 handoff in Stage 3.',
      confirm: 'OK',
    },
    accessibility: {
      emailIcon: 'Email',
      fullNameIcon: 'Full name',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      loading: 'Please wait',
    },
  },
} as const;

export type EnglishCopy = typeof en;
