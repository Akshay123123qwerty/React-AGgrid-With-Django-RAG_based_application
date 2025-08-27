import { useRef, useState } from "react";
import Save from "./save";

interface DropdownRow {
  inputValue: string;
}

const Dropdown = () => {
  const [rows, setRows] = useState<DropdownRow[]>([]);
  const [options,setOptions] = useState<string[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);


  const handleRow = () => {
    setRows([...rows, { inputValue: "" }]);
  };

 


 
  const updateInput = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].inputValue = value;
    setRows(newRows);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const newOptions = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      setOptions((prev) => Array.from(new Set([...prev, ...newOptions])));
    }, 1000); 
  
  };

  return (
    <>
      <button onClick={handleRow}>Add Dropdown</button>

      {rows.map((row, index) => {
       
        return (
          <div key={index} style={{ display: "grid", gap: "10px" }}>
            
            <input
              type="text"
              value={row.inputValue}
              onChange={(e) => updateInput(index, e.target.value)}
              placeholder="Enter "
            />

           
            <select>
              {options.length > 0 ? (
                options.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))
              ) : (
                <option disabled>No options</option>
              )}
            </select>

            <select>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

    

          </div>
        );
      })}
        <Save content = {rows}/>

    </>
  );
};

export default Dropdown;
