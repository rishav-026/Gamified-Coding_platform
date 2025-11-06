import React from 'react';

const App = ({ children }) => {
  // App component is now just a wrapper
  // The actual layout is handled by AppLayout
  return <>{children}</>;
};

export default App;
