import { Archivo, Barlow, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted via next/font — fonts are downloaded at build time and served
 * from our own domain with automatic preload + font-display: swap.
 * This replaces the old `@import url("https://fonts.googleapis.com/...")`
 * in globals.css, which was render-blocking (extra DNS lookup + CSS fetch
 * + font fetch, all in sequence, before text could render).
 */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${barlow.variable} ${jetbrainsMono.variable}`;
