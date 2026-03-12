import { useState } from 'react';
import { PiPaintBrush } from 'react-icons/pi';
import { THEMES, MISC_INFO } from '../data/config';
import { useTheme } from '../context/ThemeContext';
import BasePopup from './BasePopup';

export default function ThemeSwitcher() {
  if (!MISC_INFO.showThemeSwitcher) return null;
  const { themeName, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Change theme"
        className="fixed bottom-6 left-6 z-50 p-3 text-t-primary hover:text-t-muted transition-colors cursor-pointer outline-none"
      >
        <PiPaintBrush className="w-5 h-5" aria-hidden="true" />
      </button>

      <BasePopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="p-8 max-w-sm"
        zIndex="z-[100]"
        ariaLabel="Theme switcher"
      >
        <h3 className="font-serif italic text-3xl lowercase text-t-primary mb-2 pr-6">
          Appearance
        </h3>
        <p className="text-t-muted text-sm mb-8 leading-relaxed">Choose a theme for the site.</p>

        <div className="flex flex-col gap-3">
          {availableThemes.map((name) => {
            const t = THEMES[name];
            const isActive = themeName === name;
            return (
              <button
                key={name}
                onClick={() => {
                  setTheme(name);
                  setIsOpen(false);
                }}
                aria-pressed={isActive}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl border transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-border text-left ${
                  isActive
                    ? 'border-accent bg-raised'
                    : 'border-border bg-raised hover:border-t-muted'
                }`}
              >
                <div className="flex gap-1.5 shrink-0">
                  {[t.bgBase, t.bgRaised, t.accent].map((color, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-black/10"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-t-primary flex-1">{t.label}</span>

                {isActive && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: t.accent }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </BasePopup>
    </>
  );
}
