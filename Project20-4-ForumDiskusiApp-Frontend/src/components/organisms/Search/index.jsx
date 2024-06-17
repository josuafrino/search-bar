// import React, { useState } from "react";
// import IconPlaceholder from "../../atoms/IconPlaceholder";

// export default function Search({ setResults }) {
//   const [input, setInput] = useState("");

//   const fetchData = (value) => {
//     fetch("http://localhost:3000/questions")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((question) => {
//           return value && question && (question.title.toLowerCase().includes(value.toLowerCase()) || question.body.toLowerCase().includes(value.toLowerCase()));
//         });
//         setResults(results);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   };

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   };

//   return (
//     <>
//       <div className="input-wrapper d-flex align-items-center shadow-sm rounded p-2">
//         <IconPlaceholder variant={"search"} />
//         <input className="form-control border-0 ml-2" placeholder="Ketik untuk mencari..." value={input} onChange={(e) => handleChange(e.target.value)} />
//       </div>
//     </>
//   );
// }
