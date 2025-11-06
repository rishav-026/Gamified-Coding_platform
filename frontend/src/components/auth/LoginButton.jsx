import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Button from '../common/Button';
import { authService } from '../../services/authService';

const LoginButton = () => {
  const handleGithubLogin = () => {
    authService.initiateGithubLogin();
  };

  return (
    <Button
      onClick={handleGithubLogin}
      variant="primary"
      size="lg"
      icon={<FaGithub />}
      className="w-full md:w-auto"
    >
      Sign in with GitHub
    </Button>
  );
};

export default LoginButton;
