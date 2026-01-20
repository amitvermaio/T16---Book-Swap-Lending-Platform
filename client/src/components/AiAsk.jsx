import React, { useState } from 'react';
const AiAsk = () => {
  const [aiAnswer, setAiAnswer] = useState('');

  async function askAI(question) {
    const response = await fetch('/api/ai/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: question }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let answer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      answer += decoder.decode(value);
      setAiAnswer(answer);
    }
  }


  return (
    <div>AiAsk</div>
  )
}

export default AiAsk