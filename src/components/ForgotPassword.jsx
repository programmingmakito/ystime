import React, { useState } from 'react';

function ForgotPassword({ onBack }) {
  const [userId, setUserId] = useState('');
  const [birthday, setBirthday] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerificationSubmit = (event) => {
    event.preventDefault();
    const storedUser = localStorage.getItem(userId);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (
        birthday === user.birthday &&
        secretQuestion === user.secretQuestion &&
        secretAnswer === user.secretAnswer
      ) {
        setShowResetForm(true);
      } else {
        setMessage('情報が一致しません');
      }
    } else {
      setMessage('ユーザーIDが存在しません');
    }
  };

    const handlePasswordReset = (event) => {
        event.preventDefault();
        if(newPassword === confirmPassword){
            const storedUser = localStorage.getItem(userId);
            const user = JSON.parse(storedUser)
            const updatedUser = { ...user, password: newPassword };
            localStorage.setItem(userId, JSON.stringify(updatedUser));
            setMessage('パスワードを変更しました');
            setShowResetForm(false)
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage("パスワードが一致しません")
        }
    }

  return (
    <div className="app-container">
      {!showResetForm ? (
        <>
          <h2>パスワードを忘れた場合</h2>
          <form className="forgot-password-form" onSubmit={handleVerificationSubmit}>
            <input
              type="text"
              placeholder="ユーザーID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="date"
              placeholder="生年月日"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <select value={secretQuestion} onChange={(e) => setSecretQuestion(e.target.value)}>
              <option value="">秘密の質問を選択してください</option>
              <option value="question1">好きな食べ物は何ですか？</option>
              <option value="question2">ペットの名前は何ですか？</option>
              <option value="question3">出身地はどこですか？</option>
            </select>
            <input
              type="text"
              placeholder="秘密の質問の答え"
              value={secretAnswer}
              onChange={(e) => setSecretAnswer(e.target.value)}
            />
            <button type="submit">確認</button>
          </form>
        </>
      ) : (
        <>
          <h2>パスワードリセット</h2>
          <form className="reset-password-form" onSubmit={handlePasswordReset}>
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
            <button type="submit">パスワードリセット</button>
          </form>
        </>
      )}
      {message && <p>{message}</p>}
      <button onClick={onBack}>戻る</button>
    </div>
  );
}

export default ForgotPassword;
