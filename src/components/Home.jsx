import React from 'react';

function Home({ onLogout, onMyPage }) {
  return (
    <div className="app-container">
      <h1>Y's Time</h1>
      <p>Y's Timeアプリへようこそ！</p>
      <button onClick={onMyPage} className="small-button">マイページ</button>
      <button className="small-button">勤怠管理</button>
        <a href="#" onClick={onLogout} className="logout-link">
            ログアウト
        </a>
    </div>
  );
}

export default Home;
