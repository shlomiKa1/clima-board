import { useEffect, useRef } from "react";

const InputCity = ({
  input,
  saveInput,
}: {
  input: string;
  saveInput: (input: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => saveInput(e.target.value)}
        placeholder="Tel Aviv"
        ref={inputRef}
        onFocus={() => saveInput("")}
      />
    </div>
  );
};

export default InputCity;
