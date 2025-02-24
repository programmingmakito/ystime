import React, { useState, useEffect } from 'react';

function Admin({ onLogout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchedUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (typeof item === 'object' && item !== null && item.username) {
          fetchedUsers.push({ userId: key, ...item });
        }
      } catch (e) {
        console.log("error", e);
      }
    }
    setUsers(fetchedUsers);
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm('本当にこのユーザーを削除しますか？')) {
      localStorage.removeItem(userId);
      // ユーザーリストを更新
      setUsers(users.filter((user) => user.userId !== userId));
    }
  };

  return (
    <div className="app-container">
      <h2>管理者ページ</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>ID</th>
            <th>生年月日</th>
            <th>秘密の質問</th>
            <th>秘密の質問の答え</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.userId}</td>
              <td>{user.birthday}</td>
              <td>{user.secretQuestion}</td>
              <td>{user.secretAnswer}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.userId)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onLogout}>ログアウト</button>
    </div>
  );
}

export default Admin;
