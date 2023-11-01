import { useState, useEffect } from "react";

function Main() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(""); // Initialize with an empty string

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/data.json"); // Replace with the correct file path or URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="main">
      <div className="header">
        <div className="input">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search for a country"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        <select
          name="region"
          id="region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div>
        <div className="all-countries">
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter(
              (item) => selectedRegion === "" || item.region === selectedRegion
            )
            .map((item, index) => (
              <div key={index} className="country">
                <div className="image">
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className="info">
                  <h2>{item.name}</h2>
                  <p>population : {item.population}</p>
                  <p>region: {item.region}</p>
                  <p>Capital: {item.capital}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
