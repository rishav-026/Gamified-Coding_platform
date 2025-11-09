import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './GitHubTutorials.css';

export default function GitHubTutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    fetchTutorials();
    fetchUserProgress();
  }, []);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tutorials/list');
      if (response.data.success) {
        setTutorials(response.data.tutorials);
      }
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await api.get('/tutorials/user/demo_user/progress');
      if (response.data.success) {
        const progressMap = {};
        response.data.progress.forEach(p => {
          progressMap[p.tutorial_id] = p;
        });
        setUserProgress(progressMap);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const selectTutorial = async (tutorial_id) => {
    try {
      const response = await api.get(`/tutorials/${tutorial_id}`);
      if (response.data.success) {
        setSelectedTutorial(response.data.tutorial);
        setShowQuiz(false);
        setQuizAnswers({});
      }
    } catch (error) {
      console.error('Error selecting tutorial:', error);
    }
  };

  const handleQuizAnswer = (question_id, option_index) => {
    setQuizAnswers({
      ...quizAnswers,
      [question_id]: option_index
    });
  };

  const submitQuiz = async () => {
    try {
      // Calculate score
      let correct = 0;
      selectedTutorial.quiz.forEach(question => {
        if (quizAnswers[question.id] === question.correct_answer) {
          correct++;
        }
      });
      
      const score = (correct / selectedTutorial.quiz.length) * 100;
      
      // Submit to backend
      const response = await api.post('/tutorials/complete', {
        tutorial_id: selectedTutorial.id,
        quiz_score: score,
        user_id: 'demo_user'
      });

      if (response.data.success) {
        setQuizResult({
          score: score,
          correct: correct,
          total: selectedTutorial.quiz.length,
          xp_earned: response.data.xp_earned,
          passed: response.data.completed
        });
        
        // Update progress
        fetchUserProgress();
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading tutorials...</div>;
  }

  return (
    <div className="tutorials-container">
      <div className="tutorials-header">
        <h1>📚 GitHub & Git Learning Tutorials</h1>
        <p>Master Git and GitHub with interactive lessons and quizzes</p>
      </div>

      <div className="tutorials-layout">
        {/* Left: Tutorial List */}
        <div className="tutorials-list">
          <h2>Lessons</h2>
          {tutorials.map((tutorial) => {
            const progress = userProgress[tutorial.id];
            const isCompleted = progress && progress.completed;
            
            return (
              <div
                key={tutorial.id}
                className={`tutorial-item ${selectedTutorial?.id === tutorial.id ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => selectTutorial(tutorial.id)}
              >
                <div className="tutorial-item-header">
                  <span className="order">{tutorial.order}</span>
                  <span className="title">{tutorial.title}</span>
                  {isCompleted && <span className="badge-completed">✓</span>}
                </div>
                <div className="tutorial-item-meta">
                  <span className="difficulty">{tutorial.difficulty}</span>
                  <span className="xp">{tutorial.xp_reward} XP</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Tutorial Content */}
        <div className="tutorial-content">
          {selectedTutorial ? (
            <>
              {!showQuiz ? (
                <>
                  <div className="content-header">
                    <h2>{selectedTutorial.title}</h2>
                    <div className="content-meta">
                      <span className="difficulty">{selectedTutorial.difficulty}</span>
                      <span className="xp">+{selectedTutorial.xp_reward} XP</span>
                    </div>
                  </div>

                  <div className="content-body">
                    <p className="description">{selectedTutorial.description}</p>
                    
                    <div className="markdown-content">
                      {selectedTutorial.content.split('\n').map((line, idx) => {
                        if (line.startsWith('# ')) {
                          return <h3 key={idx}>{line.substring(2)}</h3>;
                        } else if (line.startsWith('## ')) {
                          return <h4 key={idx}>{line.substring(3)}</h4>;
                        } else if (line.startsWith('- ')) {
                          return <li key={idx}>{line.substring(2)}</li>;
                        } else if (line.startsWith('```')) {
                          return <code key={idx} className="code-block">{selectedTutorial.code_example}</code>;
                        } else if (line.trim()) {
                          return <p key={idx}>{line}</p>;
                        }
                        return null;
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQuiz(true)}
                    className="btn-start-quiz"
                  >
                    Start Quiz ({selectedTutorial.quiz.length} questions)
                  </button>
                </>
              ) : (
                <>
                  <div className="quiz-header">
                    <h2>Quiz: {selectedTutorial.title}</h2>
                  </div>

                  <div className="quiz-questions">
                    {selectedTutorial.quiz.map((question, idx) => (
                      <div key={question.id} className="quiz-question">
                        <h4>{idx + 1}. {question.question}</h4>
                        <div className="quiz-options">
                          {question.options.map((option, optIdx) => (
                            <label key={optIdx} className="quiz-option">
                              <input
                                type="radio"
                                name={question.id}
                                value={optIdx}
                                checked={quizAnswers[question.id] === optIdx}
                                onChange={() => handleQuizAnswer(question.id, optIdx)}
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < selectedTutorial.quiz.length}
                    className="btn-submit-quiz"
                  >
                    Submit Quiz
                  </button>

                  {quizResult && (
                    <div className={`quiz-result ${quizResult.passed ? 'passed' : 'failed'}`}>
                      <h3>{quizResult.passed ? '🎉 Passed!' : '❌ Try Again!'}</h3>
                      <p>Score: {quizResult.correct}/{quizResult.total} ({quizResult.score.toFixed(0)}%)</p>
                      {quizResult.passed && (
                        <p className="xp-earned">+{quizResult.xp_earned} XP</p>
                      )}
                      <button
                        onClick={() => {
                          setShowQuiz(false);
                          setQuizAnswers({});
                          setQuizResult(null);
                        }}
                        className="btn-continue"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="no-selection">
              Select a tutorial to begin learning
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
