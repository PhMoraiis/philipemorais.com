'use server'

import { cookies } from 'next/headers'

export type Locale = (typeof locales)[number];

export const locales = ['en', 'pt-br'] as const
export const defaultLocale: Locale = 'en'
// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale)
}