import React, { useState } from 'react';

function AdminLogin({ onAdminLogin }) {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (adminId === 'staff' && adminPassword === 'ibaygetsbetter') {
      onAdminLogin();
    } else {
      alert('管理者IDまたはパスワードが違います');
    }
  };

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <h2>管理者ログイン</h2>
      <input
        type="text"
        placeholder="管理者ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
      />
      <input
        type="password"
        placeholder="管理者パスワード"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
}

export default AdminLogin;
