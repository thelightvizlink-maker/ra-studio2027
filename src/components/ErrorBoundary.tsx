import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

// Guard the app against full white/gray screens when a render error slips through.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Keep console visibility in production builds for faster triage.
    console.error('Unhandled render error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="neo-card max-w-xl w-full p-8 text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">
              A rendering error occurred. Please reload the page. If the issue persists, contact us directly.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="neo-button interactive text-primary hover:bg-primary/10"
            >
              Reload page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

