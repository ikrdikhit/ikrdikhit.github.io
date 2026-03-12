/// <reference types="vite/client" />

interface Window {
  /** Called by main.tsx after React mounts to release the font-aware loading screen. */
  __onAppMounted?: () => void;
}
