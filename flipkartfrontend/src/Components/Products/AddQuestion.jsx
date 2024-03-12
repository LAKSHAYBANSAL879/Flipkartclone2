import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddQuestionForm = ({ productName, onQuestionAdded, userName }) => {
  const [content, setContent] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddQuestion = async () => {
    try {
      const response = await fetch('https://flipkartclone2-o8uw.onrender.com/api/v1/question/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, userName: userName, productName }),
      });

      if (response.ok) {
        const data = await response.json();
        onQuestionAdded(data.question);
        // Close the modal after successfully adding the question
        setModalOpen(false);
      } else {
        console.error('Failed to add question:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className='font-bold m-2' >
        <FontAwesomeIcon icon={faPlus} /> Add Question
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleAddQuestion}>Add Question</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestionForm;
