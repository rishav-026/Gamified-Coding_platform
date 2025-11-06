import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="danger"
      icon={<FaSignOutAlt />}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
