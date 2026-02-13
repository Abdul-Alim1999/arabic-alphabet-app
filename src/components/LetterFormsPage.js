// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const LetterFormsPage = () => {
//   const letters = useSelector((state) => state.alphabet.letters);
//   const [testMode, setTestMode] = useState(false);
//   const [currentTest, setCurrentTest] = useState(null);
//   const [feedback, setFeedback] = useState("");
//   const [feedbackVisible, setFeedbackVisible] = useState(false);
//   const [showMobileCards, setShowMobileCards] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0); // Для постраничного просмотра на мобильных
//   const navigate = useNavigate();
//   const feedbackTimeoutRef = useRef(null);

//   // Очищаем таймер при размонтировании
//   useEffect(() => {
//     return () => {
//       if (feedbackTimeoutRef.current) {
//         clearTimeout(feedbackTimeoutRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const shouldShowCards =
//         window.innerWidth <= 768 ||
//         (window.innerWidth <= 992 && window.innerHeight > window.innerWidth);
//       setShowMobileCards(shouldShowCards);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const formsOrder = [
//     { key: "isolated", label: "Изолированная" },
//     { key: "initial", label: "Начальная" },
//     { key: "medial", label: "Средняя" },
//     { key: "final", label: "Конечная" },
//   ];

//   const itemsPerPage = 3; // Количество букв на странице

//   const totalPages = Math.ceil(letters.length / itemsPerPage);

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentLetters = letters.slice(startIndex, endIndex);

//   const goToNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const startTest = () => {
//     setTestMode(true);
//     generateNewQuestion();
//   };

//   const generateNewQuestion = () => {
//     if (feedbackTimeoutRef.current) {
//       clearTimeout(feedbackTimeoutRef.current);
//     }
//     const withForms = letters.filter(
//       (l) =>
//         l.forms.initial || l.forms.medial || l.forms.final || l.forms.isolated,
//     );
//     if (withForms.length === 0) {
//       setFeedback("Нет доступных букв с формами.");
//       setFeedbackVisible(true);
//       return;
//     }
//     const randomLetter =
//       withForms[Math.floor(Math.random() * withForms.length)];
//     const availableForms = formsOrder
//       .filter((f) => randomLetter.forms[f.key])
//       .map((f) => f.key);
//     if (availableForms.length === 0) {
//       setFeedback("Нет доступных форм.");
//       setFeedbackVisible(true);
//       return;
//     }
//     const randomForm =
//       availableForms[Math.floor(Math.random() * availableForms.length)];

//     setCurrentTest({
//       letter: randomLetter,
//       formKey: randomForm,
//       formValue: randomLetter.forms[randomForm],
//     });
//     setFeedback("");
//     setFeedbackVisible(false);
//   };

//   const handleTestSubmit = (selectedKey) => {
//     if (!currentTest) return;

//     if (selectedKey === currentTest.formKey) {
//       setFeedback(
//         `.Правильно! Это форма "${formsOrder.find((f) => f.key === currentTest.formKey).label}" буквы ${currentTest.letter.name}`,
//       );
//     } else {
//       setFeedback(
//         `.Неправильно! Это форма "${formsOrder.find((f) => f.key === currentTest.formKey).label}" буквы ${currentTest.letter.name}`,
//       );
//     }
//     setFeedbackVisible(true);

//     feedbackTimeoutRef.current = setTimeout(() => {
//       setFeedbackVisible(false);
//       setTimeout(() => {
//         generateNewQuestion();
//       }, 150);
//     }, 2200);
//   };

//   if (testMode) {
//     return (
//       <div
//         style={{
//           padding: "15px",
//           direction: "rtl",
//           textAlign: "center",
//           maxWidth: "800px",
//           margin: "0 auto",
//           position: "relative",
//         }}
//       >
//         <h2>Тест: Узнай форму буквы</h2>

//         <div
//           style={{
//             height: "60px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginBottom: "15px",
//           }}
//         >
//           <div
//             style={{
//               opacity: feedbackVisible ? 1 : 0,
//               visibility: feedbackVisible ? "visible" : "hidden",
//               transform: feedbackVisible
//                 ? "scale(1) translateY(0)"
//                 : "scale(0.9) translateY(-10px)",
//               transition:
//                 "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s linear",
//               fontSize: showMobileCards ? "1.1rem" : "1.3rem",
//               fontWeight: "bold",
//               padding: "10px 15px",
//               borderRadius: "8px",
//               color: feedback.includes("Правильно") ? "#27ae60" : "#e74c3c",
//               backgroundColor: feedback.includes("Правильно")
//                 ? "#d4efdf"
//                 : "#fadbd8",
//               border: `2px solid ${feedback.includes("Правильно") ? "#27ae60" : "#e74c3c"}`,
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//               display: "inline-block",
//               textAlign: "center",
//               pointerEvents: "none",
//               zIndex: 10,
//             }}
//           >
//             {feedback}
//           </div>
//         </div>

//         <div
//           style={{
//             textAlign: "center",
//             fontSize: showMobileCards ? "32px" : "40px",
//             margin: "10px 0 15px 0",
//           }}
//         >
//           {currentTest?.formValue}
//         </div>
//         <p
//           style={{
//             fontSize: showMobileCards ? "1rem" : "1.1rem",
//             marginBottom: "15px",
//           }}
//         >
//           Выберите, какая это форма
//         </p>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           {formsOrder
//             .filter((f) => currentTest?.letter.forms[f.key])
//             .map((f) => (
//               <button
//                 key={f.key}
//                 onClick={() => handleTestSubmit(f.key)}
//                 style={{
//                   margin: "5px",
//                   padding: showMobileCards ? "10px 14px" : "12px 16px",
//                   fontSize: showMobileCards ? "15px" : "16px",
//                   cursor: "pointer",
//                   width: "100%",
//                   maxWidth: "220px",
//                   backgroundColor: "#3498db",
//                   color: "white",
//                   borderRadius: "8px",
//                   border: "none",
//                   boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!showMobileCards) {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 6px 8px rgba(0,0,0,0.15)";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!showMobileCards) {
//                     e.currentTarget.style.transform = "";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 6px rgba(0,0,0,0.1)";
//                   }
//                 }}
//               >
//                 {f.label}
//               </button>
//             ))}
//         </div>
//         <button
//           onClick={() => setTestMode(false)}
//           style={{
//             marginTop: "20px",
//             backgroundColor: "#e74c3c",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             padding: showMobileCards ? "10px 16px" : "12px 20px",
//             fontSize: "1rem",
//             cursor: "pointer",
//             boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//             transition: "all 0.3s ease",
//             width: "100%",
//             maxWidth: "200px",
//           }}
//           onMouseEnter={(e) => {
//             if (!showMobileCards) {
//               e.currentTarget.style.transform = "translateY(-2px)";
//               e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!showMobileCards) {
//               e.currentTarget.style.transform = "";
//               e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//             }
//           }}
//         >
//           Назад к таблице
//         </button>
//       </div>
//     );
//   }

//   // --- Основной рендер для режима таблицы ---
//   return (
//     <div
//       style={{
//         padding: "10px",
//         direction: "rtl",
//         maxWidth: "100%",
//         margin: "0 auto",
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "center",
//           fontSize: showMobileCards ? "1.5rem" : "2rem",
//           marginBottom: "15px",
//         }}
//       >
//         Все формы арабских букв
//       </h2>
//       <div style={{ textAlign: "center", marginBottom: "15px" }}>
//         <button
//           onClick={startTest}
//           style={{
//             backgroundColor: "#9b59b6",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             padding: showMobileCards ? "10px 16px" : "12px 20px",
//             fontSize: "1rem",
//             cursor: "pointer",
//             boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//             transition: "all 0.3s ease",
//             width: "100%",
//             maxWidth: "200px",
//           }}
//           onMouseEnter={(e) => {
//             if (!showMobileCards) {
//               e.currentTarget.style.transform = "translateY(-2px)";
//               e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!showMobileCards) {
//               e.currentTarget.style.transform = "";
//               e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//             }
//           }}
//         >
//           Проверить себя
//         </button>
//       </div>

//       {/* Таблица для десктопа (показывает все буквы) */}
//       <div
//         style={{
//           display: showMobileCards ? "none" : "block", // Скрываем на мобильных
//         }}
//       >
//         <table
//           style={{
//             width: "100%",
//             textAlign: "center",
//             borderCollapse: "collapse",
//             margin: "0 auto",
//             fontSize: showMobileCards ? "12px" : "14px",
//           }}
//         >
//           <thead>
//             <tr>
//               <th
//                 style={{
//                   padding: "8px",
//                   borderBottom: "1px solid #ccc",
//                   fontSize: "20px",
//                 }}
//               >
//                 Буква
//               </th>
//               {formsOrder.map((f) => (
//                 <th
//                   key={f.key}
//                   style={{
//                     padding: "8px",
//                     borderBottom: "1px solid #ccc",
//                     fontSize: "20px",
//                   }}
//                 >
//                   {f.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {letters.map((letter) => (
//               <tr key={letter.id}>
//                 <td
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     fontSize: "30px",
//                   }}
//                 >
//                   <span style={{ display: "block" }}>{letter.letter}</span>
//                   <small style={{ color: "#666" }}>({letter.name})</small>
//                 </td>
//                 {formsOrder.map((f) => (
//                   <td
//                     key={f.key}
//                     style={{
//                       padding: "8px",
//                       border: "1px solid #ccc",
//                       fontSize: "50px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: showMobileCards ? "20px" : "30px",
//                         marginBottom: "2px",
//                         direction: "rtl",
//                       }}
//                     >
//                       {letter.forms[f.key] || "-"}
//                     </div>
//                     <small
//                       style={{
//                         color: "#666",
//                         display: "block",
//                         fontSize: "15px",
//                       }}
//                     >
//                       {f.label}
//                     </small>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Карточки для мобильных устройств с постраничным просмотром */}
//       <div
//         style={{
//           display: showMobileCards ? "block" : "none", // Показываем только на мобильных
//           textAlign: "center",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "10px",
//           }}
//         >

//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages - 1}
//             style={{
//               padding: "10px 15px",
//               backgroundColor:
//                 currentPage === totalPages - 1 ? "#ccc" : "#3498db",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               cursor:
//                 currentPage === totalPages - 1 ? "not-allowed" : "pointer",
//               fontSize: "1rem",
//               boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               if (currentPage < totalPages - 1) {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (currentPage < totalPages - 1) {
//                 e.currentTarget.style.transform = "";
//                 e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//               }
//             }}
//           >
//             Вперед &rarr;
//           </button>
//              <span style={{ fontSize: "1rem", color: "#666" }}>
//             Страница {currentPage + 1} из {totalPages}
//           </span>
//           <button
//             onClick={goToPrevPage}
//             disabled={currentPage === 0}
//             style={{
//               padding: "10px 15px",
//               backgroundColor: currentPage === 0 ? "#ccc" : "#3498db",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               cursor: currentPage === 0 ? "not-allowed" : "pointer",
//               fontSize: "1rem",
//               boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               if (currentPage > 0) {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (currentPage > 0) {
//                 e.currentTarget.style.transform = "";
//                 e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//               }
//             }}
//           >
//             &larr; Назад
//           </button>
//         </div>

//         {/* Карточки для текущей страницы */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//           }}
//         >
//           {currentLetters.map((letter) => (
//             <div
//               key={letter.id}
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "8px",
//                 padding: "12px",
//                 backgroundColor: "white",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "20px",
//                   textAlign: "center",
//                   marginBottom: "8px",
//                 }}
//               >
//                 {letter.letter} ({letter.name})
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "8px",
//                 }}
//               >
//                 {formsOrder.map((f) => (
//                   <div
//                     key={f.key}
//                     style={{
//                       textAlign: "center",
//                       padding: "6px",
//                       border: "1px solid #eee",
//                       borderRadius: "4px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: "30px",
//                         direction: "rtl",
//                         minHeight: "24px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       {letter.forms[f.key] || "-"}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "16px",
//                         color: "#666",
//                         marginTop: "2px",
//                       }}
//                     >
//                       {f.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             backgroundColor: "#2ecc71",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             padding: showMobileCards ? "10px 16px" : "12px 20px",
//             fontSize: "1rem",
//             cursor: "pointer",
//             boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//             transition: "all 0.3s ease",
//             width: "100%",
//             maxWidth: "200px",
//           }}
//           onMouseEnter={(e) => {
//             if (!showMobileCards) {
//               e.currentTarget.style.transform = "translateY(-2px)";
//               e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!showMobileCards) {
//               e.currentTarget.style.transform = "";
//               e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//             }
//           }}
//         >
//           Назад к алфавиту
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LetterFormsPage;

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LetterFormsPage = () => {
  const letters = useSelector((state) => state.alphabet.letters);
  const [testMode, setTestMode] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [showMobileCards, setShowMobileCards] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Для постраничного просмотра
  const navigate = useNavigate();
  const feedbackTimeoutRef = useRef(null);

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const shouldShowCards =
        window.innerWidth <= 768 ||
        (window.innerWidth <= 992 && window.innerHeight > window.innerWidth);
      setShowMobileCards(shouldShowCards);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const formsOrder = [
    { key: "isolated", label: "Изолированная" },
    { key: "initial", label: "Начальная" },
    { key: "medial", label: "Средняя" },
    { key: "final", label: "Конечная" },
  ];

  // Количество букв на страницу: 3 для мобильных, 7 для десктопа
  const itemsPerPage = showMobileCards ? 3 : 7;

  const totalPages = Math.ceil(letters.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLetters = letters.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startTest = () => {
    setTestMode(true);
    generateNewQuestion();
  };

  const generateNewQuestion = () => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    const withForms = letters.filter(
      (l) =>
        l.forms.initial || l.forms.medial || l.forms.final || l.forms.isolated,
    );
    if (withForms.length === 0) {
      setFeedback("Нет доступных букв с формами.");
      setFeedbackVisible(true);
      return;
    }
    const randomLetter =
      withForms[Math.floor(Math.random() * withForms.length)];
    const availableForms = formsOrder
      .filter((f) => randomLetter.forms[f.key])
      .map((f) => f.key);
    if (availableForms.length === 0) {
      setFeedback("Нет доступных форм.");
      setFeedbackVisible(true);
      return;
    }
    const randomForm =
      availableForms[Math.floor(Math.random() * availableForms.length)];

    setCurrentTest({
      letter: randomLetter,
      formKey: randomForm,
      formValue: randomLetter.forms[randomForm],
    });
    setFeedback("");
    setFeedbackVisible(false);
  };

  const handleTestSubmit = (selectedKey) => {
    if (!currentTest) return;

    if (selectedKey === currentTest.formKey) {
      setFeedback(
        `.Правильно! Это форма "${formsOrder.find((f) => f.key === currentTest.formKey).label}" буквы ${currentTest.letter.name}`,
      );
    } else {
      setFeedback(
        `.Неправильно! Это форма "${formsOrder.find((f) => f.key === currentTest.formKey).label}" буквы ${currentTest.letter.name}`,
      );
    }
    setFeedbackVisible(true);

    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackVisible(false);
      setTimeout(() => {
        generateNewQuestion();
      }, 150);
    }, 2200);
  };

  if (testMode) {
    return (
      <div
        style={{
          padding: "15px",
          direction: "rtl",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <h2>Тест: Узнай форму буквы</h2>

        <div
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              opacity: feedbackVisible ? 1 : 0,
              visibility: feedbackVisible ? "visible" : "hidden",
              transform: feedbackVisible
                ? "scale(1) translateY(0)"
                : "scale(0.9) translateY(-10px)",
              transition:
                "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s linear",
              fontSize: showMobileCards ? "1.1rem" : "1.3rem",
              fontWeight: "bold",
              padding: "10px 15px",
              borderRadius: "8px",
              color: feedback.includes("Правильно") ? "#27ae60" : "#e74c3c",
              backgroundColor: feedback.includes("Правильно")
                ? "#d4efdf"
                : "#fadbd8",
              border: `2px solid ${feedback.includes("Правильно") ? "#27ae60" : "#e74c3c"}`,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              display: "inline-block",
              textAlign: "center",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {feedback}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: showMobileCards ? "32px" : "40px",
            margin: "10px 0 15px 0",
          }}
        >
          {currentTest?.formValue}
        </div>
        <p
          style={{
            fontSize: showMobileCards ? "1rem" : "1.1rem",
            marginBottom: "15px",
          }}
        >
          Выберите, какая это форма
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {formsOrder
            .filter((f) => currentTest?.letter.forms[f.key])
            .map((f) => (
              <button
                key={f.key}
                onClick={() => handleTestSubmit(f.key)}
                style={{
                  margin: "5px",
                  padding: showMobileCards ? "10px 14px" : "12px 16px",
                  fontSize: showMobileCards ? "15px" : "16px",
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: "220px",
                  backgroundColor: "#3498db",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!showMobileCards) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 8px rgba(0,0,0,0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showMobileCards) {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0,0,0,0.1)";
                  }
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
            padding: showMobileCards ? "10px 16px" : "12px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: "200px",
          }}
          onMouseEnter={(e) => {
            if (!showMobileCards) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            if (!showMobileCards) {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }
          }}
        >
          Назад к таблице
        </button>
      </div>
    );
  }

  // --- Основной рендер для режима таблицы ---
  return (
    <div
      style={{
        padding: "10px",
        direction: "rtl",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: showMobileCards ? "1.5rem" : "2rem",
          marginBottom: "15px",
        }}
      >
        Все формы арабских букв
      </h2>
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          onClick={startTest}
          style={{
            backgroundColor: "#9b59b6",
            color: "white",
            borderRadius: "8px",
            border: "none",
            padding: showMobileCards ? "10px 16px" : "12px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: "200px",
          }}
          onMouseEnter={(e) => {
            if (!showMobileCards) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            if (!showMobileCards) {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }
          }}
        >
          Проверить себя
        </button>
      </div>

      {/* Таблица для десктопа (показывает по 7 букв на странице) */}
      <div
        style={{
          display: showMobileCards ? "none" : "block", // Скрываем на мобильных
        }}
      >
        <table
          style={{
            width: "100%",
            textAlign: "center",
            borderCollapse: "collapse",
            margin: "0 auto",
            fontSize: showMobileCards ? "12px" : "14px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  fontSize: "20px",
                }}
              >
                Буква
              </th>
              {formsOrder.map((f) => (
                <th
                  key={f.key}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                    fontSize: "20px",
                  }}
                >
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentLetters.map((letter) => (
              <tr key={letter.id}>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    fontSize: "30px",
                  }}
                >
                  <span style={{ display: "block" }}>{letter.letter}</span>
                  <small style={{ color: "#666" }}>({letter.name})</small>
                </td>
                {formsOrder.map((f) => (
                  <td
                    key={f.key}
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      fontSize: "50px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: showMobileCards ? "20px" : "30px",
                        marginBottom: "2px",
                        direction: "rtl",
                      }}
                    >
                      {letter.forms[f.key] || "-"}
                    </div>
                    <small
                      style={{
                        color: "#666",
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {f.label}
                    </small>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Навигация для десктопной таблицы (внизу) */}
      {!showMobileCards && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            style={{
              padding: "10px 15px",
               margin: '0 100px 0 0',
              backgroundColor:
                currentPage === totalPages - 1 ? "#ccc" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor:
                currentPage === totalPages - 1 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (currentPage < totalPages - 1) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage < totalPages - 1) {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }
            }}
          >
            Вперед &rarr;
          </button>
          <span style={{ fontSize: "1rem", color: "#666" }}>
            Страница {currentPage + 1} из {totalPages}
          </span>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            style={{
              padding: "10px 15px",
              backgroundColor: currentPage === 0 ? "#ccc" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              margin: '0 0 0 100px'
            }}
            onMouseEnter={(e) => {
              if (currentPage > 0) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage > 0) {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }
            }}
          >
            &larr; Назад
          </button>
        </div>
      )}

      {/* Карточки для мобильных устройств с постраничным просмотром */}
      <div
        style={{
          display: showMobileCards ? "block" : "none", // Показываем только на мобильных
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            style={{
              padding: "10px 15px",
              backgroundColor:
                currentPage === totalPages - 1 ? "#ccc" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor:
                currentPage === totalPages - 1 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (currentPage < totalPages - 1) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage < totalPages - 1) {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }
            }}
          >
            Вперед &rarr;
          </button>
          <span style={{ fontSize: "1rem", color: "#666" }}>
            Страница {currentPage + 1} из {totalPages}
          </span>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            style={{
              padding: "10px 15px",
              backgroundColor: currentPage === 0 ? "#ccc" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (currentPage > 0) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage > 0) {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }
            }}
          >
            &larr; Назад
          </button>
        </div>

        {/* Карточки для текущей страницы */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {currentLetters.map((letter) => (
            <div
              key={letter.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  marginBottom: "8px",
                }}
              >
                {letter.letter} ({letter.name})
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                {formsOrder.map((f) => (
                  <div
                    key={f.key}
                    style={{
                      textAlign: "center",
                      padding: "6px",
                      border: "1px solid #eee",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "30px",
                        direction: "rtl",
                        minHeight: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {letter.forms[f.key] || "-"}
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        color: "#666",
                        marginTop: "2px",
                      }}
                    >
                      {f.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#2ecc71",
            color: "white",
            borderRadius: "8px",
            border: "none",
            padding: showMobileCards ? "10px 16px" : "12px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: "200px",
          }}
          onMouseEnter={(e) => {
            if (!showMobileCards) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            if (!showMobileCards) {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }
          }}
        >
          Назад к алфавиту
        </button>
      </div>
    </div>
  );
};

export default LetterFormsPage;
