import { createContext } from 'react'

export type TThemeContext = {
  theme: {
    foreground: string,
    background: string
  },
  toggleTheme: VoidFunction,
}

export const themes = {

  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },

  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }

}

// Assurez-vous que la forme de la valeur par défaut passée à
// createContext correspond à la forme que les consommateurs attendent !
export const ThemeContext = createContext<TThemeContext>({
  theme: themes.light,
  toggleTheme: () => {},
})
