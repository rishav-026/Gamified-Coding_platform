import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! It seems like this page doesn't exist. Let's get you back on track!
        </p>
        <Button 
          onClick={() => navigate('/')} 
          variant="primary"
          size="lg"
          icon={<FaHome />}
          className="w-full"
        >
          Go to Home
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
