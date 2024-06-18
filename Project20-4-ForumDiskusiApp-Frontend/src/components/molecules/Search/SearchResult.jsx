import { Link } from "react-router-dom";

export const SearchResult = ({ result }) => {
  return (
    <div key={result.uuid}>
      <Link to={`/question/${result.uuid}`} className="text-decoration-none">
        <h3>{result.title}</h3>
      </Link>
      <p>{result.body}</p>
    </div>
  );
};

// <div
//   className="search-result"
//   onClick={(e) => alert(`You selected ${result}!`)}
// >
//   {result}
// </div>
//====================
// <div className="p-2 px-4" onClick={() => alert(`You selected ${result}!`)}>
//   {result}{" "}
// </div>
