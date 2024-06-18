import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchBar } from "./components/molecules/Search/SearchBar";
import { SearchResultsList } from "./components/molecules/Search/SearchResultsList";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#eee" }}>
      <div className="w-50 min-vw-25 d-flex flex-column align-items-center">
        <div className="mt-5 w-100">
          <SearchBar setResults={setResults} />
        </div>
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default App;
