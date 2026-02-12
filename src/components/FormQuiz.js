import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FormQuiz = () => {
  const letters = useSelector((state) => state.alphabet.letters);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const formsMap = {
    initial: "начальная",
    medial: "средняя",
    final: "конечная",
    isolated: "изолированная"
  };

  const getRandomFormQuestion = () => {
    // Проверяем, есть ли буквы
    if (!letters || letters.length === 0) {
      setFeedback("Данные ещё не загружены...");
      return;
    }

    const filtered = letters.filter(l => l.forms.initial || l.forms.medial || l.forms.final);

    if (filtered.length === 0) {
      setFeedback("Нет доступных букв с формами.");
      return;
    }

    const randomLetter = filtered[Math.floor(Math.random() * filtered.length)];

    const availableForms = ['initial', 'medial', 'final'].filter(key => randomLetter.forms[key]);
    if (availableForms.length === 0) {
      getRandomFormQuestion();
      return;
    }

    const chosenFormKey = availableForms[Math.floor(Math.random() * availableForms.length)];
    const chosenFormValue = randomLetter.forms[chosenFormKey];

    const wrongOptions = Object.keys(formsMap)
      .filter(k => k !== chosenFormKey)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allOptions = [...wrongOptions, chosenFormKey].sort(() => 0.5 - Math.random());

    setQuestion({ letter: randomLetter, formKey: chosenFormKey, formValue: chosenFormValue });
    setOptions(allOptions);
    setFeedback('');
  };

  useEffect(() => {
    getRandomFormQuestion();
  }, [letters]); // Зависимость от letters

  if (!letters || letters.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Загрузка данных...</h2>
        <p>Подождите, идёт загрузка арабского алфавита...</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          Назад к алфавиту
        </button>
      </div>
    );
  }

  const handleAnswer = (selectedKey) => {
    if (!question) return;

    if (selectedKey === question.formKey) {
      setFeedback("!Правильно");
    } else {
      setFeedback(`Неправильно! Это форма "${formsMap[question.formKey]}" буквы ${question.letter.name}`);
    }

    setTimeout(() => {
      setFeedback('');
      getRandomFormQuestion();
    }, 1500);
  };

  if (!question) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Тест: Узнай форму буквы</h2>
        <p>Загрузка вопроса...</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          Назад к алфавиту
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Тест: Узнай форму буквы</h2>

      {feedback && (
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: '20px 0',
            padding: '15px',
            borderRadius: '8px',
            color: feedback.includes("Правильно") ? "#27ae60" : "#e74c3c",
            backgroundColor: feedback.includes("Правильно") ? "#d4efdf" : "#fadbd8",
            border: `2px solid ${feedback.includes("Правильно") ? "#27ae60" : "#e74c3c"}`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            minWidth: '200px'
          }}
        >
          {feedback}
        </div>
      )}

      <div style={{ textAlign: 'center', fontSize: '48px', margin: '20px 0' }}>
        {question.formValue}
      </div>

      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
        Выберите, в какой позиции используется эта буква
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {options.map((key) => (
          <button
            key={key}
            onClick={() => handleAnswer(key)}
            style={{
              margin: '5px',
              padding: '10px 20px',
              fontSize: '18px',
              cursor: 'pointer',
              width: '200px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            {formsMap[key]}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          backgroundColor: '#2ecc71',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }}
      >
        Назад к алфавиту
      </button>
    </div>
  );
};

export default FormQuiz;
