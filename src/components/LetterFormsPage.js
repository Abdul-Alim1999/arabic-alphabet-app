import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LetterFormsPage = () => {
  const letters = useSelector((state) => state.alphabet.letters);
  const [testMode, setTestMode] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const formsOrder = [
    { key: "isolated", label: "Изолированная" },
    { key: "initial", label: "Начальная" },
    { key: "medial", label: "Средняя" },
    { key: "final", label: "Конечная" },
  ];

  const startTest = () => {
    setTestMode(true);
    generateNewQuestion();
  };

  const generateNewQuestion = () => {
    const withForms = letters.filter(
      (l) =>
        l.forms.initial || l.forms.medial || l.forms.final || l.forms.isolated,
    );
    const randomLetter =
      withForms[Math.floor(Math.random() * withForms.length)];
    const availableForms = formsOrder
      .filter((f) => randomLetter.forms[f.key])
      .map((f) => f.key);
    const randomForm =
      availableForms[Math.floor(Math.random() * availableForms.length)];

    setCurrentTest({
      letter: randomLetter,
      formKey: randomForm,
      formValue: randomLetter.forms[randomForm],
    });
    setFeedback("");
  };

  const handleTestSubmit = (selectedKey) => {
    if (selectedKey === currentTest.formKey) {
      setFeedback("!Правильно");
    } else {
      setFeedback(
        `Неправильно! Это форма "${formsOrder.find((f) => f.key === currentTest.formKey).label}"`,
      );
    }

    setTimeout(() => {
      setFeedback("");
      generateNewQuestion();
    }, 1500);
  };

  if (testMode) {
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
        <h2>Тест: Узнай форму буквы</h2>

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

        <div
          style={{ textAlign: "center", fontSize: "48px", margin: "20px 0" }}
        >
          {currentTest?.formValue}
        </div>
        <p>Выберите, какая это форма</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {formsOrder
            .filter((f) => currentTest?.letter.forms[f.key])
            .map((f) => (
              <button
                key={f.key}
                onClick={() => handleTestSubmit(f.key)}
                style={{
                  margin: "10px",
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  width: "200px",
                  backgroundColor: "#3498db",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
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
                {f.label}
              </button>
            ))}
        </div>
        <button
          onClick={() => setTestMode(false)}
          style={{
            marginTop: "20px",
            backgroundColor: "#e74c3c",
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
          Назад к таблице
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        direction: "rtl",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2>Все формы арабских букв</h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={startTest}
          style={{
            backgroundColor: "#9b59b6",
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
          Проверить себя
        </button>
      </div>

      <table
        style={{
          width: "100%",
          textAlign: "center",
          borderCollapse: "collapse",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              Буква
            </th>
            {formsOrder.map((f) => (
              <th
                key={f.key}
                style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
              >
                {f.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {letters.map((letter) => (
            <tr key={letter.id}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {letter.letter} ({letter.name})
              </td>
              {formsOrder.map((f) => (
                <td
                  key={f.key}
                  style={{ padding: "10px", border: "1px solid #ccc" }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      marginBottom: "4px",
                      direction: "rtl",
                    }}
                  >
                    {letter.forms[f.key] || "-"}
                  </div>
                  <small style={{ color: "#666" }}>{f.label}</small>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
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
    </div>
  );
};

export default LetterFormsPage;
