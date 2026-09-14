import { useState } from "react";
import InputCity from "../componets/InputCity";
import useExecute from "../hooks/useExecute";
import { useNavigate } from "react-router-dom";
import type { City } from "../types/city";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [errorResult, setErrorResult] = useState<string | null>(null);
  const { data, loading, error, execute, reset } = useExecute<City[]>();
  const navigate = useNavigate();

  const handleDetail = (nameCity: string, lat: number, lon: number) => {
    navigate(`/city/${encodeURIComponent(nameCity)}?lat=${lat}&lon=${lon}`, {
      replace: true,
    });
  };

  const handleChange = (val: string) => {
    setSearch(val);
    reset();
    setErrorResult(null);
  };

  const handleInput = async () => {
    if (!search.trim()) {
      setErrorResult("לא ניתן לחפש שדה ריק");
      return;
    }
    setErrorResult(null);
    await execute({
      method: "get",
      url: "/city/search",
      params: { name: search },
    });
  };

  return (
    <div>
      <h1>חיפוש לפי עיר</h1>
      <InputCity input={search} saveInput={handleChange} />
      <button onClick={handleInput} disabled={loading}>
        חפש...
      </button>

      <hr />

      {errorResult && <p>{errorResult}</p>}
      {loading && <p>טוען רשימת נקודות לעיר</p>}
      {error && <p>{error}</p>}
      {data?.length === 0 ? <h1>לא קיים תחזית לעיר בשם {search}</h1> : ""}

      {data && data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>מדינה</th>
              <th>עיר</th>
              <th>קו רוחב</th>
              <th>קו אורך</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((weather) => (
              <tr
              key={`${weather.latitude}-${weather.longitude}`}
                onClick={() =>
                  handleDetail(
                    weather.name,
                    weather.latitude,
                    weather.longitude,
                  )
                }
              >
                <td>{weather.country}</td>
                <td>{weather.name}</td>
                <td>{weather.latitude}</td>
                <td>{weather.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchPage;
