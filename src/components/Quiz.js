import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const letters = useSelector((state) => state.alphabet.letters);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const navigate = useNavigate();
  const messageTimeoutRef = useRef(null); // Для управления таймером

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const startNewQuestion = () => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    if (!letters || letters.length < 4) {
      setMessage("Недостаточно букв для теста");
      setMessageVisible(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * letters.length);
    const correctLetter = letters[randomIndex];

    let wrongOptions = letters
      .filter((letter) => letter.id !== correctLetter.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const shuffledOptions = [...wrongOptions, correctLetter].sort(
      () => 0.5 - Math.random(),
    );

    setCurrentLetter(correctLetter);
    setOptions(shuffledOptions);
    setMessage("");
    setMessageVisible(false); // Скрываем предыдущее сообщение
  };

  useEffect(() => {
    if (letters && letters.length > 0) {
      startNewQuestion();
    }
  }, [letters]);

  const handleSelect = (selected) => {
    if (!currentLetter) return;

    if (selected.id === currentLetter.id) {
      setMessage(`.(${currentLetter.name}) Правильно! это буква`);
    } else {
      setMessage(
        `${currentLetter.name} (${currentLetter.letter}) Неправильно! Это была буква`,
      );
    }
    setMessageVisible(true); // Показываем сообщение

    // Убираем сообщение через 1.5 секунды и генерируем новый вопрос
    messageTimeoutRef.current = setTimeout(() => {
      setMessageVisible(false); // Сначала скрываем
      setTimeout(() => {
        startNewQuestion(); // Потом генерируем новый вопрос
      }, 150); // Небольшая задержка для анимации
    }, 2200);
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
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <h2>Тест на знание арабского алфавита</h2>

      {/* Зарезервированное место для сообщения */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {/* Внутренний контейнер для сообщения */}
        <div
          style={{
            opacity: messageVisible ? 1 : 0,
            visibility: messageVisible ? "visible" : "hidden",
            transform: messageVisible
              ? "scale(1) translateY(0)"
              : "scale(0.9) translateY(-10px)",
            transition:
              "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s linear",
            fontSize: "1.3rem",
            fontWeight: "bold",
            padding: "10px 15px",
            borderRadius: "8px",
            color: message.includes("Правильно") ? "#27ae60" : "#e74c3c",
            backgroundColor: message.includes("Правильно")
              ? "#d4efdf"
              : "#fadbd8",
            border: `2px solid ${message.includes("Правильно") ? "#27ae60" : "#e74c3c"}`,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "inline-block",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {message}
        </div>
      </div>

      {currentLetter && (
        <>
          <h3
            style={{ fontSize: "48px", textAlign: "center", margin: "10px 0" }}
          >
            {currentLetter.letter}
          </h3>
          <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            :Выберите название этой буквы
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                style={{
                  fontSize: "18px",
                  margin: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </>
      )}

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

export default Quiz;
