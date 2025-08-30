type DatePickerProps = {
  label: string;
  date: string;
  setDate: (d: string) => void;
};

const DatePicker = ({ label, date, setDate }: DatePickerProps) => {
  return (
    <label className="flex flex-col text-sm">
      {label}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded p-2"
      />
    </label>
  );
}

export default DatePicker;
