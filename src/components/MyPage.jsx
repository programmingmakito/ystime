import React, { useState } from 'react';

function MyPage({ currentUserId, onBack }) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // localStorageから現在のユーザー情報を取得
  const user = JSON.parse(localStorage.getItem(currentUserId));

    const handleChangePassword = () => {
        setShowPasswordForm(true);
        setMessage(''); // メッセージをリセット
        setIsError(false)
    };

    const handlePasswordSubmit = (event) => {
        event.preventDefault();

        if(!newPassword || !confirmPassword) {
            setMessage('新しいパスワードと確認用パスワードを入力してください。');
            setIsError(true);
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('パスワードが一致しません。');
            setIsError(true);
            return;
        }

        // パスワードの簡易バリデーション (例: 8文字以上)
        if (newPassword.length < 8) {
            setMessage('パスワードは8文字以上にしてください。');
            setIsError(true);
            return;
        }

        // ユーザー情報を更新
        const updatedUser = { ...user, password: newPassword };
        localStorage.setItem(currentUserId, JSON.stringify(updatedUser));
        setMessage('パスワードを変更しました。');
        setIsError(false)
        setShowPasswordForm(false);
        setNewPassword('');
        setConfirmPassword('');
    };

  if (!user) {
    return <div>ユーザー情報が見つかりません。</div>;
  }

  return (
    <div className="app-container">
      <h2>マイページ</h2>
      <div className="mypage-container">
        <p>
          <span className="mypage-label">ユーザー名:</span> {user.username}
        </p>
        <p>
          <span className="mypage-label">ID:</span> {currentUserId}
        </p>
        <p>
          <span className="mypage-label">生年月日:</span> {user.birthday}
        </p>
        <p>
          <span className="mypage-label">秘密の質問:</span> {user.secretQuestion}
        </p>
        <p>
          <span className="mypage-label">秘密の質問の答え:</span> {user.secretAnswer}
        </p>
        <button onClick={handleChangePassword}>パスワードを変更する</button>
        {showPasswordForm && (
          <form className="password-change-form" onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="新しいパスワード"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="新しいパスワード（確認用）"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">変更</button>
          </form>
        )}
        {message && <p style={{color: isError ? 'red' : 'green'}}>{message}</p>}
      </div>
      <button onClick={onBack}>戻る</button>
    </div>
  );
}

export default MyPage;
