import React from 'react';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

const EditorToolbar = ({ language, onLanguageChange, onFormat, onClear }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg mb-4">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Programming Language
        </label>
        <select
          value={language}
          onChange={(e) => onLanguageChange?.(e.target.value)}
          className="input"
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.value} value={lang.value}>
              {lang.icon} {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 pt-6">
        <button
          onClick={onFormat}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Format
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
