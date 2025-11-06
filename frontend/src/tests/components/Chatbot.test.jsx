import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../../src/components/ai/Chatbot';

// Mock the AI service
jest.mock('../../src/services/aiService', () => ({
  aiService: {
    sendMessage: jest.fn().mockResolvedValue({
      message: 'Test response from AI',
    }),
  },
}));

describe('Chatbot Component', () => {
  test('renders chatbot interface', () => {
    render(<Chatbot />);
    expect(screen.getByText('AI Assistant 🤖')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your question/)).toBeInTheDocument();
  });

  test('sends message when button is clicked', async () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText(/Type your question/);
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello AI' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Hello AI')).toBeInTheDocument();
    });
  });

  test('disables send button when input is empty', () => {
    render(<Chatbot />);
    const sendButton = screen.getByText('Send');
    expect(sendButton).toBeDisabled();
  });

  test('enables send button when input has text', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText(/Type your question/);
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    expect(sendButton).not.toBeDisabled();
  });
});
