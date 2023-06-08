/*
 * @Author: Hong.Zhang
 * @Date: 2022-09-07 15:33:49
 * @Description:
 */
import React from "react";

import enUS from './en-US';
import idID from './id-ID';
import thTH from './th-TH';
import viVN from './vi-VN';

export const Locales = {
  'en-US': enUS,
  'id-ID': idID,
  'th-TH': thTH,
  'vi-VN': viVN,
} as Record<string, any>;

// just in order to provider setLocale function for child component.
export const SetAppLocaleContext = React.createContext<any>(null);
