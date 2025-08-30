import { useState } from "react";
import { useNasaQuery } from './hooks/useNasaQuery';
import DatePicker from "./components/DatePicker";
import AsteroidTable from "./components/AsteroidTable";

export default function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const dateRangeError = new Date(endDate) < new Date(startDate);
 
  const { data = [], isLoading, error } = useNasaQuery(
    startDate,
    endDate,
    !dateRangeError,
  );
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">NASA Near-Earth Objects Dashboard</h1>
      <div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-6">
          <span className="mx-2 text-gray-500">Select a date range:</span>
          <DatePicker label="Start Date" date={startDate} setDate={setStartDate} />
          <span className="mx-2 text-gray-500">to</span>
          <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && !dateRangeError && <p className="text-red-500">{error.message}</p>}
        {dateRangeError && <p className="text-red-500">End date must be after start date</p>}
        {data && <AsteroidTable asteroids={data} />}
      </div>
    </div>
  );
}
