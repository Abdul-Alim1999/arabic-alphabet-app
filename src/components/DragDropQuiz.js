import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DragDropQuiz = () => {
  const letters = useSelector((state) => state.alphabet.letters);
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const navigate = useNavigate();
  const feedbackTimeoutRef = useRef(null); // Для управления таймером

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (letters && letters.length > 0) {
      resetQuiz();
    }
  }, [letters]);

  const resetQuiz = () => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    if (!letters || letters.length === 0) {
      setFeedback("Данные ещё не загружены...");
      setFeedbackVisible(true);
      return;
    }

    const shuffled = [...letters].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    const targetLetter = selected[0];

    setTarget(targetLetter);
    setOptions([...selected].sort(() => 0.5 - Math.random()));
    setFeedback('');
    setFeedbackVisible(false); // Скрываем предыдущее сообщение
  };

  const handleDrop = (e, letter) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData("text/plain");

    if (parseInt(droppedLetter) === target.id) {
      setFeedback(`.Правильно! Это буква: ${target.name}`);
    } else {
      setFeedback(`.Неправильно! Это была буква: ${target.name}`);
    }
    setFeedbackVisible(true); // Показываем сообщение

    // Убираем сообщение через 2.2 секунды и генерируем новый вопрос
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackVisible(false); // Сначала скрываем
      setTimeout(() => {
        resetQuiz(); // Потом генерируем новый вопрос
      }, 150); // Небольшая задержка для анимации
    }, 2200);
  };

  const handleDragStart = (e, letterId) => {
    e.dataTransfer.setData("text/plain", letterId);
  };

  // Если данные не загружены
  if (!letters || letters.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Загрузка данных...</h2>
        <p>Подождите, идёт загрузка арабского алфавита...</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            backgroundColor: "#2ecc71",
            color: "white",
            borderRadius: "8px",
            border: "none",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
          }}
        >
          Назад к алфавиту
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        direction: "rtl",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
        position: "relative", // Важно для позиционирования потомка с position: absolute
      }}
    >
      <h2>Перетащи букву в нужное место</h2>
<<<<<<< HEAD
      <p>"{target?.name}"</p>
=======
      <p>Перетащите букву "{target?.name}" на нужное место ниже</p>
>>>>>>> 70bf009b82dcd9c29abab6e957a74b6be6ec65ee

      {/* Зарезервированное место для сообщения */}
      <div
        style={{
          height: "60px", // Фиксируем высоту
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {/* Внутренний контейнер для сообщения */}
        <div
          style={{
            opacity: feedbackVisible ? 1 : 0, // Управляем прозрачностью
            visibility: feedbackVisible ? 'visible' : 'hidden', // Управляем видимостью
            transform: feedbackVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-10px)', // Плавное появление/исчезновение
            transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s linear', // Плавные переходы
            fontSize: "1.3rem",
            fontWeight: "bold",
            padding: "10px 15px",
            borderRadius: "8px",
            color: feedback.includes("Правильно") ? "#27ae60" : "#e74c3c",
            backgroundColor: feedback.includes("Правильно") ? "#d4efdf" : "#fadbd8",
            border: `2px solid ${feedback.includes("Правильно") ? "#27ae60" : "#e74c3c"}`,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "inline-block",
            textAlign: "center",
            pointerEvents: 'none', // Сообщение не мешает кликам под ним
            zIndex: 10, // Повышаем z-index
          }}
        >
          {feedback}
        </div>
      </div>

      {/* Цель (куда нужно перетащить) */}
      <div
        onDrop={(e) => handleDrop(e, target)}
        onDragOver={(e) => e.preventDefault()}
        style={{
          width: "80px",
          height: "80px",
          border: "2px dashed #ccc",
          margin: "20px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#3498db";
          e.currentTarget.style.backgroundColor = "#ecf0f1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#ccc";
          e.currentTarget.style.backgroundColor = "#f9f9f9";
        }}
      >
        ?
      </div>

      {/* Варианты для перетаскивания */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {options.map((opt) => (
          <div
            key={opt.id}
            draggable
            onDragStart={(e) => handleDragStart(e, opt.id)}
            style={{
              fontSize: "32px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "grab",
              textAlign: "center",
              width: "60px",
              margin: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 10px rgba(0,0,0,0.15)";
              e.currentTarget.style.cursor = "grab";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            {opt.letter}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          backgroundColor: "#2ecc71",
          color: "white",
          borderRadius: "8px",
          border: "none",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        Назад к алфавиту
      </button>
    </div>
  );
};

export default DragDropQuiz;
