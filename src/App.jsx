import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import MyPage from './components/MyPage';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showMyPage, setShowMyPage] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('currentUserId');
    const storedIsAdmin = localStorage.getItem('isAdmin');

    if (storedIsLoggedIn === 'true' && storedUserId) {
      setIsLoggedIn(true);
      setCurrentUserId(storedUserId)
      if (storedIsAdmin === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogin = (userId) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserId', userId)
    setIsLoggedIn(true);
    setCurrentUserId(userId)
    if (userId === 'admin') {
      // 仮の管理者ユーザー名
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    }
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setShowAdmin(false);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUserId');
    setIsLoggedIn(false);
    setCurrentUserId(null);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAdmin(false);
  };

  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
    if (isAdminLoggedIn) {
      handleAdminLogout();
    }
  };

  const toggleMyPage = () => {
    setShowMyPage(!showMyPage);
  };

  return (
    <>
      {isAdminLoggedIn ? (
        <Admin onLogout={handleAdminLogout} />
      ) : showAdmin ? (
        <AdminLogin onAdminLogin={handleAdminLogin} />
      ) : (
        <div className="app-container">
          {isLoggedIn ? (
            showMyPage ? (
              <MyPage currentUserId={currentUserId} onBack={toggleMyPage} />
            ) : (
              <Home onLogout={handleLogout} onMyPage={toggleMyPage} />
            )
          ) : showSignup ? (
            <Signup onSignup={handleSignup} toggleSignup={toggleSignup} />
          ) : showForgotPassword ? (
            <ForgotPassword onBack={toggleForgotPassword} />
          ) : (
            <Login
              onLogin={handleLogin}
              toggleSignup={toggleSignup}
              toggleAdmin={toggleAdmin}
              toggleForgotPassword={toggleForgotPassword}
            />
          )}
        </div>
      )}
      <a href="#" onClick={toggleAdmin} className="admin-link">
        管理者ページ
      </a>
    </>
  );
}

export default App;
