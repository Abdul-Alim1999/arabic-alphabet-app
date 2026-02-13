// import React, { useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// const LetterDetail = () => {
//   const { id } = useParams();
//   const letters = useSelector((state) => state.alphabet.letters);
//   const letter = letters.find((l) => l.id === Number(id));

//   const audioRef = useRef(null);

//   const playAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = 0;
//       audioRef.current
//         .play()
//         .catch((e) => console.error("Ошибка воспроизведения:", e));
//     }
//   };

//   if (!letter) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <h2>Буква не найдена</h2>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         padding: "15px", // Уменьшаем отступы на мобильных
//         textAlign: "center",
//         maxWidth: "100%", // Убираем ограничение ширины
//         margin: "0 auto",
//       }}
//     >
//       {/* Кнопка "Назад" в шапке */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between", // Распределяем элементы по краям
//           alignItems: "center",
//           marginBottom: "15px", // Уменьшаем отступ
//         }}
//       >
//         <button
//           onClick={() => window.history.back()}
//           style={{
//             padding: "10px 15px",
//             backgroundColor: "#e74c3c",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontSize: "0.9rem",
//             boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//             transition: "all 0.3s ease",
//             flexShrink: 0, // Кнопка не сжимается
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-2px)";
//             e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "";
//             e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//           }}
//         >
//           ⬅ Назад
//         </button>
//         {/* Заголовок по центру */}
//         <h2
//           style={{
//             margin: "0", // Убираем отступы у заголовка
//             fontSize: "1.5rem", // Уменьшаем размер шрифта заголовка на мобильных
//             flex: 1, // Заголовок занимает оставшееся пространство
//             textAlign: "center", // Центрируем текст
//           }}
//         >
//           Детали буквы
//         </h2>
//         {/* Пустой div для баланса кнопки "Назад" */}
//         <div style={{ width: "100px", flexShrink: 0 }}></div>
//       </div>

//       <h3
//         style={{
//           fontSize: "40px", // Уменьшаем размер главной буквы
//           margin: "15px 0", // Уменьшаем отступы
//         }}
//       >
//         {letter.letter}
//       </h3>
//       <p>
//         <strong>Имя:</strong> {letter.name}
//       </p>
//       <p>
//         <strong>Транслитерация:</strong> {letter.transliteration}
//       </p>

//       <button
//         onClick={playAudio}
//         style={{
//           marginTop: "15px", // Уменьшаем отступ
//           padding: "10px 20px",
//           backgroundColor: "#3498db",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontSize: "1rem",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//           transition: "all 0.3s ease",
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = "translateY(-2px)";
//           e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = "";
//           e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//         }}
//       >
//         🔊 Слушать
//       </button>

//       <audio ref={audioRef} src={letter.audio} preload="none" />

//       {/* Формы буквы */}
//       <div style={{ marginTop: "25px" }}>
//         <h4>Формы буквы:</h4>
//         <table
//           style={{
//             width: "100%",
//             textAlign: "center",
//             margin: "0 auto",
//             borderCollapse: "collapse",
//             fontSize: "14px", // Уменьшаем размер шрифта в таблице
//           }}
//         >
//           <thead>
//             <tr>
//               <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
//                 Изолированная
//               </th>
//               <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
//                 Начальная
//               </th>
//               <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
//                 Средняя
//               </th>
//               <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
//                 Конечная
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
//                 {letter.forms.isolated}
//               </td>
//               <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
//                 {letter.forms.initial || "-"}
//               </td>
//               <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
//                 {letter.forms.medial || "-"}
//               </td>
//               <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
//                 {letter.forms.final || "-"}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LetterDetail;

import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LetterDetail = () => {
  const { id } = useParams();
  const letters = useSelector((state) => state.alphabet.letters);
  const letter = letters.find((l) => l.id === Number(id));

  const audioRef = useRef(null);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error("Ошибка воспроизведения:", e));
    }
  };

  if (!letter) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Буква не найдена</h2>
      </div>
    );
  }

  const formsOrder = [
    { key: "isolated", label: "Изолированная" },
    { key: "initial", label: "Начальная" },
    { key: "medial", label: "Средняя" },
    { key: "final", label: "Конечная" },
  ];

  return (
    <div
      style={{
        padding: "15px",
        textAlign: "center",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      {/* Кнопка "Назад" в шапке */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "10px 15px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            flexShrink: 0,
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
          ⬅ Назад
        </button>
        <h2
          style={{
            margin: "0",
            fontSize: "1.5rem",
            flex: 1,
            textAlign: "center",
          }}
        >
          Детали буквы
        </h2>
        <div style={{ width: "100px", flexShrink: 0 }}></div>
      </div>

      <h3
        style={{
          fontSize: "40px",
          margin: "15px 0",
        }}
      >
        {letter.letter}
      </h3>
      <p>
        <strong>Имя:</strong> {letter.name}
      </p>
      <p>
        <strong>Транслитерация:</strong> {letter.transliteration}
      </p>

      <button
        onClick={playAudio}
        style={{
          marginTop: "15px",
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
      <div style={{ marginTop: "25px" }}>
        <h4>:Формы буквы</h4>
        {isMobileView ? (
          // Карточки для мобильных
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
            }}
          >
            {formsOrder.map((form) => (
              <div
                key={form.key}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  width: "100%",
                  maxWidth: "300px", // Ограничиваем ширину карточки
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "35px", // Размер буквы в карточке
                    marginBottom: "10px",
                    direction: "rtl", // Правильное направление для арабского
                  }}
                >
                  {letter.forms[form.key] || "-"}
                </div>
                <div
                  style={{
                    fontSize: "16px", // Размер названия формы
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  {form.label}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Таблица для десктопа
          <table
            style={{
              width: "100%",
              textAlign: "center",
              margin: "0 auto",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
                  Изолированная
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
                  Начальная
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
                  Средняя
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc", fontSize: '18px' }}>
                  Конечная
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
                  {letter.forms.isolated}
                </td>
                <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
                  {letter.forms.initial || "-"}
                </td>
                <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
                  {letter.forms.medial || "-"}
                </td>
                <td style={{ fontSize: "35px", padding: "8px", border: "1px solid #ddd" }}>
                  {letter.forms.final || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LetterDetail;