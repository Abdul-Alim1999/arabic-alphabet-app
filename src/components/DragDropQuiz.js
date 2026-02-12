import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DragDropQuiz = () => {
  const letters = useSelector((state) => state.alphabet.letters);
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (letters && letters.length > 0) {
      resetQuiz();
    }
  }, [letters]);

  const resetQuiz = () => {
    if (!letters || letters.length === 0) {
      setFeedback("Данные ещё не загружены...");
      return;
    }

    const shuffled = [...letters].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    const targetLetter = selected[0];

    setTarget(targetLetter);
    setOptions([...selected].sort(() => 0.5 - Math.random()));
    setFeedback("");
  };

  const handleDrop = (e, letter) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData("text/plain");

    if (parseInt(droppedLetter) === target.id) {
      setFeedback("Правильно!");
      setTimeout(() => {
        resetQuiz();
      }, 1500);
    } else {
      setFeedback(`Неправильно! Это была буква: ${target.name}`);
      setTimeout(() => {
        setFeedback("");
      }, 1500);
    }
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
      }}
    >
      <h2>Перетащи букву в нужное место</h2>
      <p>Перетащите букву "{target?.name}" на нужное место ниже.</p>

      {/* Красивый блок с результатом */}
      {feedback && (
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "20px 0",
            padding: "15px",
            borderRadius: "8px",
            color: feedback.includes("Правильно") ? "#27ae60" : "#e74c3c",
            backgroundColor: feedback.includes("Правильно")
              ? "#d4efdf"
              : "#fadbd8",
            border: `2px solid ${feedback.includes("Правильно") ? "#27ae60" : "#e74c3c"}`,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            display: "inline-block",
            minWidth: "200px",
          }}
        >
          {feedback}
        </div>
      )}

      {/* Цель (куда нужно перетащить) */}
      <div
        onDrop={(e) => handleDrop(e, target)}
        onDragOver={(e) => e.preventDefault()}
        style={{
          width: "100px",
          height: "100px",
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