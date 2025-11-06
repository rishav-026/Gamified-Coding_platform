import React, { useState } from 'react';
import QuestCard from './QuestCard';
import { DIFFICULTY_LEVELS } from '../../utils/constants';

const QuestList = ({ quests, userProgress }) => {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuests = quests.filter(quest => {
    const matchesDifficulty = filterDifficulty === 'all' || quest.difficulty === filterDifficulty;
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search quests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input flex-1"
          />
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="input md:w-48"
          >
            <option value="all">All Difficulties</option>
            {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
              <option key={key} value={value.value}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quest Grid */}
      {filteredQuests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-2">No quests found</p>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map(quest => (
            <QuestCard 
              key={quest.id}
              quest={quest}
              userProgress={userProgress?.[quest.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestList;
