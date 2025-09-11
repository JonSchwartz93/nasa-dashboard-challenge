type SizePickerProps = {
  label: string;
  size: number;
  setSize: (d: number) => void;
};

const SizePicker = ({ label, size, setSize }: SizePickerProps) => {
  return (
    <label className="flex flex-col text-sm">
      {label}
      <input
        type="number"
        placeholder={label}
        value={size}
        step={0.01}
        onChange={(e) => setSize(Number(e.target.value))}
        className="border rounded p-2"
      />
    </label>
  );
}

export default SizePicker;
