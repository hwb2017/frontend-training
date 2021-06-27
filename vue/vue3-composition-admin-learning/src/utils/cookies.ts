import Keys from '@/constant/key'
import Cookies from 'js-cookie'

export const getSidebarStatus = (): string | undefined => Cookies.get(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string): string | undefined => Cookies.set(Keys.sidebarStatusKey, sidebarStatus)

export const getLanguage = (): string | undefined => Cookies.get(Keys.languageKey)
export const setLanguage = (language: string): string | undefined => Cookies.set(Keys.languageKey, language)

export const getSize = (): string | undefined => Cookies.get(Keys.sizeKey)
export const setSize = (size: string): string | undefined => Cookies.set(Keys.sizeKey, size)

export const getToken = (): string | undefined => Cookies.get(Keys.tokenKey)
export const setToken = (token: string): string | undefined => Cookies.set(Keys.tokenKey, token)
export const removeToken = (): void => Cookies.remove(Keys.tokenKey)
