import React, { useState } from 'react';
import AuthPage from './components/AuthPage';

function App() {
  const [isRegistering, setIsRegistering] = useState(false); // Login page first

  return (
    <div style={{ overflow: 'hidden' }}>
      <AuthPage isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
    </div>
  );
}

export default App;
