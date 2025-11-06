import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Button from '../common/Button';
import { FaPlay, FaSave } from 'react-icons/fa';
import Card from '../common/Card';

const CodeEditor = ({ 
  initialCode = '', 
  language = 'javascript',
  onSubmit,
  onSave,
  theme = 'vs-light',
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await onSubmit?.(code);
      setOutput(result || 'Code submitted successfully!');
    } catch (err) {
      setError(err.message);
      setOutput('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = () => {
    onSave?.(code);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Editor Header */}
      <div className="flex items-center justify-between bg-gray-900 text-white p-4 rounded-t-lg">
        <div>
          <h3 className="font-bold text-lg">Code Editor</h3>
          <p className="text-xs text-gray-400">Language: {language}</p>
        </div>
        <div className="flex gap-2">
          {onSave && (
            <Button 
              onClick={handleSave}
              variant="secondary"
              size="sm"
              icon={<FaSave />}
            >
              Save
            </Button>
          )}
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || readOnly}
            loading={isSubmitting}
            size="sm"
            icon={<FaPlay />}
          >
            {isSubmitting ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <Card className="flex-1 p-0 rounded-none shadow-none border border-gray-300">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly: readOnly,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          }}
          loading={<div className="p-4">Loading editor...</div>}
        />
      </Card>

      {/* Output Panel */}
      {(output || error) && (
        <Card className={`p-4 rounded-b-lg ${error ? 'bg-red-50 border-l-4 border-red-500' : 'bg-green-50 border-l-4 border-success'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-bold ${error ? 'text-red-700' : 'text-green-700'}`}>
              {error ? '❌ Error' : '✅ Output'}
            </h4>
            {output && (
              <button
                onClick={() => setOutput('')}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
          <pre className={`text-sm whitespace-pre-wrap break-words font-mono ${
            error ? 'text-red-600' : 'text-green-600'
          }`}>
            {error || output}
          </pre>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;
