import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddAnswerForm = ({ questionId, onAnswerAdded }) => {
  const [content, setContent] = useState('');
  const { user } = useContext(UserContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddAnswer = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/question/addAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, content, userName: user.name }),
      });

      if (response.ok) {
        const data = await response.json();
        onAnswerAdded(data.question);
        
        setModalOpen(false);
      } else {
        console.error('Failed to add answer:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className='text-blue-500'><FontAwesomeIcon icon={faPlus} className='mx-2'/>Add Answer</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleAddAnswer} className='text-blue-500'>Add Answer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAnswerForm;
