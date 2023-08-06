import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const [remainingTime, setRemainingTime] = useState(60);
  const { user, isAuthenticated, logout, loginWithPopup } = useAuth0();

  useEffect(() => {
    let timer;
    if (isAuthenticated) {
      // I have Set up the timer only when the user is authenticated
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); 
    }

    return () => {
      // Clear the timer when the component unmounts or user logs out
      clearInterval(timer);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (remainingTime === 0 && isAuthenticated) {
      logout();
    }
  }, [remainingTime, isAuthenticated, logout]);

  const handleAction = () => {
    // Reset the timer to 60 seconds on user action
    setRemainingTime(60);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated && <h3>Hello {user.name}, You are logged in to CodeTentacles App</h3>}
        
        {isAuthenticated ? (
          <>
            <button onClick={() => logout()}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                margin: '10px 0',
              }}
            >Log Out</button>
            <p>Time remaining: {remainingTime} seconds</p>
          </>
        ) : (
          <>
            <button onClick={() => loginWithPopup()}
               style={{
                backgroundColor: '#008CBA',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                margin: '10px 0',
              }}
            
            >Login</button>
            <p>Please login to start the session.</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
