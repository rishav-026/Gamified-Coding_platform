import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuestCard from '../../src/components/quests/QuestCard';

describe('QuestCard Component', () => {
  const mockQuest = {
    id: '1',
    title: 'Test Quest',
    description: 'This is a test quest',
    difficulty: 'beginner',
    xp_reward: 100,
    tasks: [
      { id: 'task1', title: 'Task 1' },
      { id: 'task2', title: 'Task 2' },
    ],
  };

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('renders quest card with title', () => {
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={null} />);
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
  });

  test('displays quest description', () => {
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={null} />);
    expect(screen.getByText('This is a test quest')).toBeInTheDocument();
  });

  test('shows XP reward', () => {
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={null} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('displays difficulty level', () => {
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={null} />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  test('shows task progress', () => {
    const userProgress = {
      completed_tasks: ['task1'],
    };
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={userProgress} />);
    expect(screen.getByText(/1\/2 tasks/)).toBeInTheDocument();
  });

  test('shows "Start Quest" button when not started', () => {
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={null} />);
    expect(screen.getByText('Start Quest')).toBeInTheDocument();
  });

  test('shows "Continue Quest" button when in progress', () => {
    const userProgress = {
      completed_tasks: ['task1'],
    };
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={userProgress} />);
    expect(screen.getByText('Continue Quest')).toBeInTheDocument();
  });

  test('shows "Review Quest" button when completed', () => {
    const userProgress = {
      completed_tasks: ['task1', 'task2'],
    };
    renderWithRouter(<QuestCard quest={mockQuest} userProgress={userProgress} />);
    expect(screen.getByText(/Review Quest/)).toBeInTheDocument();
  });
});
