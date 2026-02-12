import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LetterDetail = () => {
  const { id } = useParams();
  const letters = useSelector((state) => state.alphabet.letters);
  const letter = letters.find((l) => l.id === Number(id));

  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error("Ошибка воспроизведения:", e));
    }
  };

  if (!letter) {
    return <div>Буква не найдена</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Кнопка "Назад" в шапке */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Детали буквы</h2>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "10px 15px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem",
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
          ⬅️ Назад
        </button>
      </div>

      <h3 style={{ fontSize: "48px", margin: "20px 0" }}>{letter.letter}</h3>
      <p>
        <strong>Имя:</strong> {letter.name}
      </p>
      <p>
        <strong>Транслитерация:</strong> {letter.transliteration}
      </p>

      <button
        onClick={playAudio}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
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
        🔊 Слушать
      </button>

      <audio ref={audioRef} src={letter.audio} preload="none" />

      {/* Формы буквы */}
      <div style={{ marginTop: "30px" }}>
        <h4>Формы буквы:</h4>
        <table
          style={{
            width: "100%",
            textAlign: "center",
            margin: "0 auto",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Изолированная</th>
              <th>Начальная</th>
              <th>Средняя</th>
              <th>Конечная</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: "32px" }}>{letter.forms.isolated}</td>
              <td style={{ fontSize: "32px" }}>
                {letter.forms.initial || "-"}
              </td>
              <td style={{ fontSize: "32px" }}>{letter.forms.medial || "-"}</td>
              <td style={{ fontSize: "32px" }}>{letter.forms.final || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LetterDetail;


