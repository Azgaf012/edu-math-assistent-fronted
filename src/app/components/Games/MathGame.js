import React, { useState } from 'react';
import Button from '../common/Button';

const MathGame = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer('');  // Clear the input after submitting.
  };

  return (
    <div className="math-game">
      <div className="question">{question}</div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer..."
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default MathGame;
