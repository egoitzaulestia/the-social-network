import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Search = () => {
  const { postName } = useParams();

  useEffect(() => {
    console.log("Searching for:", postName);
  }, [postName]);

  return (
    <>
      <h1>Search</h1>
      <p>Searching for: {postName}</p>
    </>
  );
};

export default Search;
