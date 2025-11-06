import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';
import Card from '../common/Card';
import { aiService } from '../../services/aiService';

const CodeReviewer = ({ code, language, taskId }) => {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReviewCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.reviewCode(code, language, { taskId });
      setReview(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Code Review</h3>
        <button
          onClick={handleReviewCode}
          disabled={isLoading}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors font-medium disabled:opacity-50"
        >
          {isLoading ? 'Reviewing...' : 'Review Code'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded mb-4">
          <p className="font-semibold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {review && (
        <div className="space-y-4">
          {/* Correct */}
          {review.correct && review.correct.length > 0 && (
            <FeedbackSection
              icon={<FaCheckCircle className="text-success text-2xl" />}
              title="✅ Correct"
              items={review.correct}
              color="success"
            />
          )}

          {/* Warnings */}
          {review.warnings && review.warnings.length > 0 && (
            <FeedbackSection
              icon={<FaExclamationTriangle className="text-warning text-2xl" />}
              title="⚠️ Warnings"
              items={review.warnings}
              color="warning"
            />
          )}

          {/* Improvements */}
          {review.improvements && review.improvements.length > 0 && (
            <FeedbackSection
              icon={<FaLightbulb className="text-primary-500 text-2xl" />}
              title="🚀 Improvements"
              items={review.improvements}
              color="primary"
            />
          )}
        </div>
      )}

      {!review && !isLoading && (
        <p className="text-gray-500 text-center py-8">
          Click "Review Code" to get AI feedback on your submission.
        </p>
      )}
    </Card>
  );
};

const FeedbackSection = ({ icon, title, items, color }) => {
  const colorClasses = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    primary: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`p-4 border rounded-lg ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-gray-500 mt-1">•</span>
            <span className="text-sm text-gray-800">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeReviewer;
