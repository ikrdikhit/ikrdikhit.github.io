import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Replace with your error monitoring service (Sentry, etc.) if added later
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <main className="min-h-screen w-full bg-base text-t-primary flex flex-col items-center justify-center gap-6 px-6">
          <h1 className="text-4xl font-serif italic lowercase">something went wrong.</h1>
          <p className="text-t-muted text-center max-w-md">
            An unexpected error occurred. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Reload Page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
