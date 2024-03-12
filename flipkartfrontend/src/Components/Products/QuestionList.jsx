import React, { useEffect, useState } from 'react';
import AddAnswerForm from './AddAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const QuestionList = ({ productName }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://flipkartclone2-o8uw.onrender.com/api/v1/question/getQuestion/${productName}`);
        if (response.ok) {
          const data = await response.json();
          console.log("data is :",data);
          setQuestions(data.questions);
        } else {
          console.error('Failed to fetch questions:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [productName]);

  const handleAnswerAdded = (updatedQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q._id === updatedQuestion._id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h1 className='font-bold text-2xl border-b-2 pb-2'>Questions and Answers</h1>
      {questions.map((question) => (
        <div key={question._id} className='border-2 gap-3 flex flex-col my-2 p-2'>
          <p className='font-bold'>Q. {question.content}</p>
          {/* <p>Product Name: {question.productName}</p> */}
          {/* <p className='font-semibold'>A.</p> */}
          {question.answers.map((answer) => (
            
            <div key={answer._id} className='font-semibold'>
              <p>A. {answer.content}</p>
            <h1 className='text-gray-500'>{answer.userName} <FontAwesomeIcon icon={faCheckCircle} className='mx-2'/><span>Certified Buyer</span></h1>
        
            </div>
            
          ))}
          <AddAnswerForm questionId={question._id} onAnswerAdded={handleAnswerAdded} />
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
