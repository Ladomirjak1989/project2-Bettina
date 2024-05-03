import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css'
import { useNavigate } from "react-router-dom";
import Slogan from "../Slogan/Slogan";


const SearchBar = () => {
  const [input, setInput] = useState("");
  const [result, setResults] = useState("");

  const navigate = useNavigate()
  
  const fetchData = () => {
    fetch("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => response.json())
      .then((json) => {
        const filteredResults = json.filter(
          (item) =>
            item.capital[0]?.toLowerCase().includes(input.toLowerCase())
        );
        setResults(filteredResults);
      });
  };

  useEffect(() => {
    if (input.length >= 3) {
      fetchData();
    }
  }, [input]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleResultClick = (res) => {
    // setInput(res.capital);
    setResults(""); // Clear the selected result
setInput('')
    navigate(`/cities/${res.capital[0]}/restaurants`)
  };
  return (
    <div className="input-wrapper">
      <div className='subtitle'>
       <Slogan/> 
        </div>
      <form className="form-style" onSubmit={handleSubmit}>
        <input
          style={{ width: "500px" }}
          placeholder="Type to search..."
          type="text"
          value={input}
          onChange={handleInput}
        />
        <button className="button-style" style={{ width: '5%' }} type="submit">
          <FaSearch id="search-icon" />
        </button>
      </form>

      <div className="results-list">
        {!!result.length &&
          result.map((result) => (
           <div 
              onClick={() => handleResultClick(result)}
            className="search-result"
              key={result.area}
            >
              {result.capital[0]}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
