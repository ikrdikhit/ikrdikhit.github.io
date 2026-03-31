import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Prefetch all lazy page chunks shortly after the initial render.
// Each chunk is only a few KB — this costs almost nothing but means
// navigation feels instant instead of waiting for a download on first click.
setTimeout(() => {
  import('./pages/AboutMe');
  import('./pages/BlogList');
  import('./pages/BlogPost');
  import('./pages/ProjectCatalogue');
  import('./pages/Project');
  import('./pages/Links');
  import('./pages/NotFound');
}, 2000);
