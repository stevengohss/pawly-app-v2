import { en } from "@/lib/i18n/en";
import { zh } from "@/lib/i18n/zh";

type Locale = "en" | "zh";
type TranslationLeaf = readonly string[];
type TranslationTree = {
  readonly [key: string]: TranslationLeaf | TranslationTree;
};

const translations = {
  en,
  zh
} as const satisfies Record<Locale, TranslationTree>;

let currentLocale: Locale = "en";

export function getLocale() {
  return currentLocale;
}

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function t(key: string, locale = currentLocale) {
  const values = getValues(key, locale);

  return values?.[0] ?? getMissingKeyFallback(key);
}

export function tRandom(key: string, locale = currentLocale) {
  const values = getValues(key, locale);

  if (!values?.length) {
    return getMissingKeyFallback(key);
  }

  if (values.length === 1) {
    return values[0];
  }

  return values[getStableIndex(`${locale}:${key}`, values.length)];
}

function getValues(key: string, locale: Locale) {
  let value: TranslationLeaf | TranslationTree | undefined = translations[locale];

  for (const segment of key.split(".")) {
    if (!value || isTranslationLeaf(value)) {
      return undefined;
    }

    value = value[segment];
  }

  return isTranslationLeaf(value) ? value : undefined;
}

function getMissingKeyFallback(key: string) {
  return `[missing translation: ${key}]`;
}

function isTranslationLeaf(value: TranslationLeaf | TranslationTree): value is TranslationLeaf {
  return Array.isArray(value);
}

function getStableIndex(value: string, modulo: number) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash % modulo;
}
