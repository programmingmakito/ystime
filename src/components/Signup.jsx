import React, { useState } from 'react';

function Signup({ onSignup, toggleSignup }) {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // ユーザーIDの重複チェック
    if (localStorage.getItem(userId)) {
      alert('このユーザーIDは既に使用されています');
      return;
    }

    if (username && userId && password && birthday && secretQuestion && secretAnswer) {
        // ユーザー情報をオブジェクトとしてまとめる
        const userData = {
            username,
            password,
            birthday,
            secretQuestion,
            secretAnswer,
        };

        // ユーザーIDをキーとして、ユーザー情報をJSON文字列に変換してlocalStorageに保存
        localStorage.setItem(userId, JSON.stringify(userData));
        onSignup();
    } else {
      alert('すべての項目を入力してください');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>アカウント作成</h2>
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <button type="submit">アカウント作成</button>
      <p>
        <a href="#" onClick={toggleSignup}>ログイン画面へ戻る</a>
      </p>
    </form>
  );
}

export default Signup;
