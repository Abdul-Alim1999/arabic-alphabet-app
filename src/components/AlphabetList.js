import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AlphabetList = () => {
  const letters = useSelector((state) => state.alphabet.letters);

  return (
    <div
      style={{
        padding: "20px",
        direction: "rtl",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2>Арабский алфавит</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <Link
          to="/quiz"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
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
          Тест: Выбор буквы
        </Link>
        <Link
          to="/drag-quiz"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
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
          Тест: Перетаскивание
        </Link>
        <Link
          to="/form-quiz"
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF9800",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
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
          Тест: Формы букв
        </Link>
        <Link
          to="/forms"
          style={{
            padding: "10px 20px",
            backgroundColor: "#9C27B0",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
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
          Все формы букв
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: "10px",
          direction: "rtl",
        }}
      >
        {letters.map((letter) => (
          <Link
            key={letter.id}
            to={`/letter/${letter.id}`}
            style={{
              textAlign: "center",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"; // Только подъём, без scale
              e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ fontSize: "32px" }}>{letter.letter}</div>
            <div
              style={{ fontSize: "14px", marginTop: "5px", fontWeight: "bold" }}
            >
              {letter.name}
            </div>{" "}
            {/* Увеличенный размер */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlphabetList;


