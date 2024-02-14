import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {ILocation} from "@/DTO/Location.ts";

interface IAutocompleteProps {
  suggestions: ILocation[]
  setLocation: Dispatch<SetStateAction<ILocation>>

  setAddress: Dispatch<SetStateAction<string>>
}

export function Autocomplete({suggestions, setAddress, setLocation}: IAutocompleteProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false)

  const handleChange = () => {
    if (inputValue.trim() === "") {
      setShowSuggestions(false);
      setClicked(false)
    } else {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    handleChange()
  }, [suggestions, inputValue]);

  const handleClick = (value: ILocation) => {
    setInputValue(value.formatted);
    setClicked(true);
    setShowSuggestions(false);
    setLocation(value)
  };

  useEffect(() => {
    setAddress(inputValue)
  }, [inputValue]);

  return (
    <header className="flex-col">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
        className="border-2 w-1/3 h-12 font-black italic text-cyan-100 text-lg placeholder:font-black placeholder:italic placeholder:text-cyan-950"
      />
      {showSuggestions && !clicked && suggestions.length > 0 && (
        <ul className="z-10 w-1/3 bg-white border rounded mt-1 py-1 shadow-lg max-h-64 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 text-black py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(suggestion)}
            >
              {suggestion.formatted}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}