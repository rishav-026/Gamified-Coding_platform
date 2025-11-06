import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import BadgeGallery from '../components/badges/BadgeGallery';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserBadges();
  }, []);

  const fetchUserBadges = async () => {
    try {
      const data = await userService.getUserBadges();
      setBadges(data);
    } catch (error) {
      console.error('Failed to fetch badges:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-6">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={user.username}
                className="w-24 h-24 rounded-full border-4 border-primary-500"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user?.username}</h1>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <FaEnvelope /> {user?.email || 'Not provided'}
              </p>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <FaCalendarAlt /> Member since {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button variant="outline" icon={<FaEdit />}>
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-4xl font-bold text-primary-600">{user?.level || 1}</p>
          <p className="text-gray-600 mt-2">Current Level</p>
        </Card>
        <Card className="text-center">
          <p className="text-4xl font-bold text-yellow-600">{(user?.total_xp || 0).toLocaleString()}</p>
          <p className="text-gray-600 mt-2">Total XP</p>
        </Card>
        <Card className="text-center">
          <p className="text-4xl font-bold text-orange-600">{user?.current_streak || 0}d</p>
          <p className="text-gray-600 mt-2">Current Streak</p>
        </Card>
      </div>

      {/* Badges Section */}
      {!loading && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <BadgeGallery earnedBadges={badges} />
        </div>
      )}
    </div>
  );
};

export default Profile;
