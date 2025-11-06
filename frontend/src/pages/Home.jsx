import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FaCode, FaTrophy, FaRocket, FaUsers, FaChartLine, FaMedal } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, testLogin } = useAuth();

  const features = [
    {
      icon: <FaCode size={40} />,
      title: 'Learn to Code',
      description: 'Interactive coding quests designed to teach you step by step, from basics to advanced concepts.'
    },
    {
      icon: <FaTrophy size={40} />,
      title: 'Earn Rewards',
      description: 'Gain XP, unlock badges, climb leaderboards, and show off your achievements to the community.'
    },
    {
      icon: <FaRocket size={40} />,
      title: 'Real OSS Contributions',
      description: 'Contribute to actual open source projects and make a real impact on the developer community.'
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Community Support',
      description: 'Get help from AI assistants, join discussions, and learn from other developers worldwide.'
    },
    {
      icon: <FaChartLine size={40} />,
      title: 'Track Progress',
      description: 'Visualize your learning journey with detailed analytics and progress tracking tools.'
    },
    {
      icon: <FaMedal size={40} />,
      title: 'Compete & Collaborate',
      description: 'Participate in leaderboards, team challenges, and collaborative learning experiences.'
    },
  ];

  const stats = [
    { label: 'Active Learners', value: '10K+' },
    { label: 'Quests Available', value: '500+' },
    { label: 'Tasks Completed', value: '100K+' },
    { label: 'Community Members', value: '50K+' },
  ];

  const handleTestLogin = () => {
    testLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-yellow-300">CodeQuest</span> 🚀
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Learn coding, earn rewards, and contribute to open source projects in a gamified environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Button
                      onClick={handleTestLogin}
                      variant="primary"
                      size="lg"
                      className="bg-white text-primary-600 hover:bg-gray-100"
                    >
                      🧪 Test Login (Demo)
                    </Button>
                    <Button
                      onClick={() => navigate('/about')}
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:bg-opacity-20"
                    >
                      Learn More
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="primary"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-gray-100"
                  >
                    Go to Dashboard
                  </Button>
                )}
              </div>

              {/* Test Login Info */}
              <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg border border-white border-opacity-30 backdrop-blur-sm">
                <p className="text-sm text-primary-100">
                  <strong>👉 For Testing:</strong> Click "Test Login" to use demo account. Backend integration coming soon!
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 border border-white border-opacity-20">
                <div className="space-y-4">
                  <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
                  <div className="h-4 bg-white bg-opacity-20 rounded"></div>
                  <div className="h-4 bg-white bg-opacity-20 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose CodeQuest?</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Combine the best of gamification, AI-powered learning, and real open source contributions
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <div className="text-primary-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl mb-8 text-primary-100">Join thousands of learners on CodeQuest today</p>
          {!isAuthenticated && (
            <Button
              onClick={handleTestLogin}
              variant="primary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
