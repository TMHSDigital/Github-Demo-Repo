import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

// Mock chart.js to prevent errors in test environment
vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn()
  },
  registerables: []
}));

// Mock react-chartjs-2
vi.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="bar-chart">Chart Placeholder</div>
}));

describe('App Component', () => {
  it('renders header correctly', () => {
    render(<App />);
    expect(screen.getByText('GitHub Demo UI')).toBeInTheDocument();
    expect(screen.getByText(/demonstration of React/i)).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders chart after data is loaded', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
  });

  it('displays features section', () => {
    render(<App />);
    
    expect(screen.getByText('Features Demonstrated')).toBeInTheDocument();
    expect(screen.getByText('React component architecture')).toBeInTheDocument();
    expect(screen.getByText('Data visualization with Chart.js')).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    render(<App />);
    
    expect(screen.getByText(/GitHub Demo Repository © 2025/i)).toBeInTheDocument();
  });
}); 