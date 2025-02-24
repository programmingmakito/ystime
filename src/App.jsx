import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h1>Notepad</h1>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here..."
        rows={10}
        cols={50}
      />
      <p>Text Length: {text.length}</p>
    </div>
  );
}

export default App;
