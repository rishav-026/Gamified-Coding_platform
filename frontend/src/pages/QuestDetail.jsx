import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questService } from '../services/questService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import TaskCheckList from '../components/quests/TaskCheckList';
import CodeEditor from '../components/code-editor/CodeEditor';
import Chatbot from '../components/ai/Chatbot';
import CodeReviewer from '../components/ai/CodeReviewer';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

const QuestDetail = () => {
  const { questId } = useParams();
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    fetchQuestDetail();
  }, [questId]);

  const fetchQuestDetail = async () => {
    try {
      setLoading(true);
      const data = await questService.getQuestById(questId);
      setQuest(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await questService.completeTask(questId, taskId);
      await fetchQuestDetail();
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !quest) {
    return (
      <div className="space-y-4">
        <Button onClick={() => navigate(-1)} variant="outline">
          <FaArrowLeft className="mr-2" /> Go Back
        </Button>
        <Card className="bg-red-50 border-l-4 border-red-500">
          <p className="text-red-700 font-bold">Error</p>
          <p className="text-red-600">{error || 'Quest not found'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button onClick={() => navigate(-1)} variant="outline" size="sm">
          <FaArrowLeft className="mr-2" /> Back
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{quest.title}</h1>
            <p className="text-gray-600 mb-4">{quest.description}</p>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                quest.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                quest.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {quest.difficulty?.charAt(0).toUpperCase() + quest.difficulty?.slice(1)}
              </span>
              <div className="flex items-center gap-1 text-yellow-600 font-bold">
                <FaStar /> {quest.xp_reward} XP
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {['tasks', 'code', 'review', 'chat'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'review' ? 'Code Review' : tab === 'chat' ? 'AI Assistant' : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'tasks' && (
          <TaskCheckList
            tasks={quest.tasks || []}
            completedTaskIds={[]}
            onCompleteTask={handleCompleteTask}
          />
        )}

        {activeTab === 'code' && (
          <CodeEditor
            language="javascript"
            onSubmit={async (code) => {
              const result = await questService.submitCode(quest.id, code);
              return result;
            }}
          />
        )}

        {activeTab === 'review' && (
          <CodeReviewer
            code=""
            language="javascript"
            taskId={quest.id}
          />
        )}

        {activeTab === 'chat' && (
          <Chatbot questContext={quest} taskId={quest.id} />
        )}
      </div>
    </div>
  );
};

export default QuestDetail;
