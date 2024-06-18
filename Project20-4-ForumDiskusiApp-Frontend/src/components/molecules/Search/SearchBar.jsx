import { useState } from "react";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:3000/questions")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((question) => {
          return question && question.title && question.body && (question.title.toLowerCase().includes(value.toLowerCase()) || question.body.toLowerCase().includes(value.toLowerCase()));
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="col-lg-12 mt-1 ms-xl-4">
      <input className="form-control border-0 ml-2" placeholder="Ketik untuk mencari..." value={input} onChange={handleChange} />
    </div>
  );
};
