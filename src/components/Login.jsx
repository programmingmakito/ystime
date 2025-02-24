import React, { useState } from 'react';

function Login({ onLogin, toggleSignup, toggleForgotPassword }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // ユーザーIDに対応するユーザー情報を取得
    const storedUser = localStorage.getItem(userId);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      // パスワードを比較
      if (password === user.password) {
        onLogin(userId);
      } else {
        alert('パスワードが違います');
      }
    } else if (userId === 'admin' && password === 'adminpass') {
      // 仮の管理者ログイン
      onLogin(userId)
    }
     else {
      alert('ユーザーIDが存在しません');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Y's Time</h2>
        <input
          type="text"
          placeholder="ユーザーID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">ログイン</button>
        <p>
          <a href="#" onClick={toggleForgotPassword}>パスワードを忘れた場合</a>
        </p>
        <p>
          <a href="#" onClick={toggleSignup}>アカウントを新規作成する</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
