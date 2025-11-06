import React from 'react';
import Card from '../common/Card';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const OutputPanel = ({ output, error, isLoading, onClear }) => {
  if (!output && !error && !isLoading) return null;

  return (
    <Card className="mt-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {error ? (
            <>
              <FaTimes className="text-red-500 text-xl" />
              <h3 className="font-bold text-red-700">Error</h3>
            </>
          ) : (
            <>
              <FaCheckCircle className="text-green-500 text-xl" />
              <h3 className="font-bold text-green-700">Output</h3>
            </>
          )}
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
          <p>Running code...</p>
        </div>
      ) : (
        <pre className={`text-sm whitespace-pre-wrap break-words font-mono max-h-48 overflow-y-auto p-3 rounded ${
          error 
            ? 'bg-red-100 text-red-700 border-l-4 border-red-500' 
            : 'bg-green-100 text-green-700 border-l-4 border-green-500'
        }`}>
          {error || output}
        </pre>
      )}
    </Card>
  );
};

export default OutputPanel;
