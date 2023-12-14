import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pallete': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#333333',
          '950': '#262626',
        },
        'light': {
          '100': '#f6f6f6',
          '200': '#e7e7e7',
          '300': '#d1d1d1',
          '400': '#b0b0b0',
          '500': '#888888',
          '600': '#6d6d6d',
          '700': '#5d5d5d',
          '800': '#4f4f4f',
          '900': '#454545',
        },
        'dark': {
          '100': '#333333',
          '200': '#262626',
          '300': '#1a1a1a',
          '400': '#0d0d0d',
        },
      },
      fontFamily: {
        'futura': ['Futura', 'sans-serif'],
        'futuraBd': ['Futura Bold', 'sans-serif'],
        'futuraHv': ['Futura Heavy', 'sans-serif'],
        'futuraLt': ['Futura Light', 'sans-serif'],
        'futuraXbd': ['Futura Extra Bold', 'sans-serif'],
        'futuraBk': ['Futura Book', 'sans-serif'],
        'futuraDm': ['Futura Demi', 'sans-serif'],
        'visage': ['Visage', 'sans-serif'],
        'visageBd': ['Visage Bold', 'sans-serif'],
      },
      maxWidth: {
        'desktop': '95%',
      },
    }
  },
  plugins: [require('tailwind-scrollbar'),],
}
export default config
