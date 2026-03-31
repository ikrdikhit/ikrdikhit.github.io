import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { THEMES, ACTIVE_THEME, type Theme } from '../data/colors.config';

type ThemeContextValue = {
  themeName: string;
  theme: Theme;
  setTheme: (name: string) => void;
  availableThemes: string[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const r = document.documentElement;
  r.style.setProperty('--bg-base', theme.bgBase);
  r.style.setProperty('--bg-raised', theme.bgRaised);
  r.style.setProperty('--bg-overlay', theme.bgOverlay);
  r.style.setProperty('--bg-hover', theme.bgHover);
  r.style.setProperty('--text-primary', theme.textPrimary);
  r.style.setProperty('--text-muted', theme.textMuted);
  r.style.setProperty('--border', theme.border);
  r.style.setProperty('--border-subtle', theme.borderSubtle);
  r.style.setProperty('--accent', theme.accent);
  r.style.setProperty('--accent-fg', theme.accentFg);
  r.style.setProperty('--code-text', theme.codeText);
  r.style.setProperty('--code-comment', theme.codeComment);
  r.style.setProperty('--code-keyword', theme.codeKeyword);
  r.style.setProperty('--code-type', theme.codeType);
  r.style.setProperty('--code-string', theme.codeString);
  r.style.setProperty('--code-meta', theme.codeMeta);
  r.style.setProperty('--code-number', theme.codeNumber);
  r.style.setProperty('--code-title', theme.codeTitle);
  r.style.setProperty('--code-variable', theme.codeVariable);
  r.style.setProperty('--code-deletion', theme.codeDeletion);

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.bgBase);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<string>(() => {
    // On first load, check localStorage, fall back to config default
    try {
      return localStorage.getItem('theme') ?? ACTIVE_THEME;
    } catch {
      return ACTIVE_THEME;
    }
  });

  // Apply theme to DOM whenever themeName changes
  useEffect(() => {
    const theme = THEMES[themeName] ?? THEMES[ACTIVE_THEME];
    applyTheme(theme);
    try {
      localStorage.setItem('theme', themeName);
    } catch {
      // ignore — private browsing, storage full, etc.
    }
  }, [themeName]);

  const setTheme = (name: string) => {
    if (THEMES[name]) setThemeName(name);
  };

  const value: ThemeContextValue = {
    themeName,
    theme: THEMES[themeName] ?? THEMES[ACTIVE_THEME],
    setTheme,
    availableThemes: Object.keys(THEMES),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Hook — use this anywhere in the app
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
