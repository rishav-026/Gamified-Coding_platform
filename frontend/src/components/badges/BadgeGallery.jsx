import React, { useState } from 'react';
import Card from '../common/Card';
import BadgeDisplay from './BadgeDisplay';
import { BADGE_TYPES } from '../../utils/constants';

const BadgeGallery = ({ earnedBadges = [], allBadges = BADGE_TYPES }) => {
  const [filterType, setFilterType] = useState('all');

  const earnedBadgeIds = earnedBadges.map(b => b.badge_id || b.id);
  
  const filteredBadges = Object.values(allBadges).filter(badge => {
    if (filterType === 'earned') return earnedBadgeIds.includes(badge.id);
    if (filterType === 'locked') return !earnedBadgeIds.includes(badge.id);
    return true;
  });

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">Badges</h3>
        
        {/* Filter */}
        <div className="flex gap-2">
          {['all', 'earned', 'locked'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filterType === type
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredBadges.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No badges to display.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBadges.map(badge => (
            <div key={badge.id} className={`relative ${!earnedBadgeIds.includes(badge.id) ? 'opacity-50' : ''}`}>
              <BadgeDisplay
                badge={badge}
                size="lg"
                showLabel={true}
                animateOnHover={earnedBadgeIds.includes(badge.id)}
              />
              {!earnedBadgeIds.includes(badge.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <span className="text-white text-2xl">🔒</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BadgeGallery;
