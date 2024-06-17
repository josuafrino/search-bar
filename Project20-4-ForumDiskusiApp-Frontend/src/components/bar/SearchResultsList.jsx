import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list w-100 bg-white d-flex flex-column shadow-sm rounded mt-3 overflow-auto" style={{ maxHeight: "300px" }}>
      {results &&
        results.map((result) => {
          return <SearchResult result={result} key={result.uuid} />;
        })}
    </div>
  );
};

// <div className="results-list">
//   {results.map((result, id) => {
//     return <SearchResult result={result.name} key={id} />;
//   })}
// </div>
