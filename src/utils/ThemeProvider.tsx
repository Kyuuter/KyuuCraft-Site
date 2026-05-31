import { createContext, useEffect, useState, useMemo } from "react";

export type Theme = "Dark" | "Light" | "System";

type ThemeProviderProps = {
  readonly children: React.ReactNode;
  readonly defaultTheme?: Theme;
  readonly storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "System",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "System",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("Light", "Dark", "Xmas");

    if (theme === "System") {
      const SystemTheme = window.matchMedia("(prefers-color-scheme: Dark)")
        .matches
        ? "Dark"
        : "Light";

      root.classList.add(SystemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(() => {
    return {
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    };
  }, [storageKey, theme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
