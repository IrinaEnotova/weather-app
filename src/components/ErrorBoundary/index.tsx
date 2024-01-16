import { Component, ErrorInfo, ReactNode, JSX } from 'react';

import ErrorBlock from 'components/ErrorBlock';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: undefined | string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): {
    hasError: boolean;
    error: Error;
  } {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('ErrorBoundary caught error!');
    console.error(error);
    console.error(errorInfo);
  }

  render(): JSX.Element | ReactNode {
    if (this.state.hasError) {
      return <ErrorBlock />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
