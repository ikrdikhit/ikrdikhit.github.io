import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';

export const HIGHLIGHT_LANGUAGES = {
  xml,
  typescript,
  javascript,
  css,
  python,
  bash,
} as const;

export const HIGHLIGHT_LANGUAGE_ENTRIES = Object.entries(HIGHLIGHT_LANGUAGES);
