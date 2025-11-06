import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../src/components/common/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('btn-primary');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('btn-secondary');
  });

  test('applies correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('btn-sm');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('btn-lg');
  });

  test('shows loading state', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
