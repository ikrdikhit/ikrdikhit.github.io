export type Theme = {
  bgBase: string; // page background
  bgRaised: string; // cards, inputs
  bgOverlay: string; // modals, code blocks
  bgHover: string; // hover states
  textPrimary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  accent: string; // scroll bar, active TOC dot
  accentFg: string; // text on top of accent bg
  codeText: string;
  codeComment: string;
  codeKeyword: string;
  codeType: string;
  codeString: string;
  codeMeta: string;
  codeNumber: string;
  codeTitle: string;
  codeVariable: string;
  codeDeletion: string;
  label: string;
};

export const THEMES: Record<string, Theme> = {
  dark: {
    label: 'Dark',
    bgBase: '#111111',
    bgRaised: '#1A1A1A',
    bgOverlay: '#161616',
    bgHover: '#222222',
    textPrimary: '#F3F3F3',
    textMuted: '#9A9A9A',
    border: '#333333',
    borderSubtle: '#222222',
    accent: '#F3F3F3',
    accentFg: '#111111',
    codeText: '#D4D4D4',
    codeComment: '#6A9955',
    codeKeyword: '#569CD6',
    codeType: '#4EC9B0',
    codeString: '#CE9178',
    codeMeta: '#D16969',
    codeNumber: '#B5CEA8',
    codeTitle: '#DCDCAA',
    codeVariable: '#9CDCFE',
    codeDeletion: '#F44747',
  },
  light: {
    label: 'Light',
    bgBase: '#FAFAFA',
    bgRaised: '#FFFFFF',
    bgOverlay: '#FCFCFC',
    bgHover: '#EEEEEE',
    textPrimary: '#111111',
    textMuted: '#666666',
    border: '#DDDDDD',
    borderSubtle: '#EEEEEE',
    accent: '#111111',
    accentFg: '#FAFAFA',
    codeText: '#2A2A2A',
    codeComment: '#6A737D',
    codeKeyword: '#005CC5',
    codeType: '#005F87',
    codeString: '#032F62',
    codeMeta: '#D73A49',
    codeNumber: '#22863A',
    codeTitle: '#6F42C1',
    codeVariable: '#E36209',
    codeDeletion: '#B31D28',
  },
  catppuccin: {
    label: 'Catppuccin',
    bgBase: '#1E1E2E',
    bgRaised: '#45475A',
    bgOverlay: '#313244',
    bgHover: '#585B70',
    textPrimary: '#CDD6F4',
    textMuted: '#7F849C',
    border: '#6C7086',
    borderSubtle: '#585B70',
    accent: '#CBA6F7',
    accentFg: '#1E1E2E',
    codeText: '#CDD6F4',
    codeComment: '#6C7086',
    codeKeyword: '#CBA6F7',
    codeType: '#94E2D5',
    codeString: '#A6E3A1',
    codeMeta: '#F38BA8',
    codeNumber: '#FAB387',
    codeTitle: '#F9E2AF',
    codeVariable: '#89DCEB',
    codeDeletion: '#F38BA8',
  },
};

// Change this one line to switch the default theme
export const ACTIVE_THEME = 'dark';
export const THEME = THEMES[ACTIVE_THEME];
