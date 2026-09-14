import { useState } from "react";
import useExecute from "../hooks/useExecute";
import type { City } from "./SearchPage";
import InputCity from "../componets/InputCity";
import useSearch from "../hooks/useSearch";
import { type CurrentData } from "../componets/CurrentWeather";

// interface WeatherResult {
//   temperature: number;
//   feels_like: number;
//   wind_speed: number;
//   weather_code: number;
// }

interface CompareCities {
  city_a: CurrentData;
  city_b: CurrentData;
}
const ComparePage = () => {
  const [searchCityA, setSearchCityA] = useState("");
  const [searchCityB, setSearchCityB] = useState("");

  const [selectedCityA, setSelectedCityA] = useState<City | null>(null);
  const [selectedCityB, setSelectedCityB] = useState<City | null>(null);

  const [errorResult, setErrorResult] = useState<string | null>(null);
  const { data, loading, execute } = useExecute<CompareCities>();

  const resultsA = useSearch(searchCityA);
  console.log("resultsA:", resultsA); //
  const resultsB = useSearch(searchCityB);

  const handleCompare = async () => {
    if (!selectedCityA || !selectedCityB) {
      setErrorResult("יש לבחור שתי ערים להשוואה");
      return;
    }

    if (selectedCityA.name === selectedCityB.name) {
      setErrorResult("לא ניתן להשוות אותם שתי ערים");
      return;
    }

    setErrorResult(null);
    await execute({
      method: "get",
      url: "/weather/compare",
      params: {
        lat_a: selectedCityA.latitude,
        lon_a: selectedCityA.longitude,
        lat_b: selectedCityB.latitude,
        lon_b: selectedCityB.longitude,
      },
    });
  };

  console.log(Number(data?.city_a.temperature_2m));

  return (
    <div>
      <h1>השוואה בין ערים</h1>

      <label>חיפוש עיר 1</label>
      <InputCity input={searchCityA} saveInput={setSearchCityA} />
      {resultsA && resultsA.length > 0 && (
        <ul>
          {resultsA.map((city) => (
            <li
              key={`${city.latitude}-${city.longitude}`}
              onClick={() => {
                setSelectedCityA(city);
                setSearchCityA(city.name);
              }}
            >
              {city.country}, {city.name}
            </li>
          ))}
        </ul>
      )}
      <label>חיפוש עיר 2</label>
      <InputCity input={searchCityB} saveInput={setSearchCityB} />
      {resultsB && resultsB.length > 0 && (
        <ul>
          {resultsB.map((city) => (
            <li
              key={`${city.latitude}-${city.longitude}`}
              onClick={() => {
                setSelectedCityB(city);
                setSearchCityB(city.name);
              }}
            >
              {city.country}, {city.name}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleCompare} disabled={loading}>
        {!loading ? "השווה" : "משווה..."}
      </button>

      {errorResult && <p>{errorResult}</p>}
      {data && (
        <div>
          {/* {console.log("data received:", data)} */}
          <h2>
            {selectedCityA?.name}:{data.city_a.current.temperature_2m}°C
          </h2>
          <h2>
            {selectedCityB?.name}: {data.city_b.current.temperature_2m}°C
          </h2>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
