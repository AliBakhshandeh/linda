"use client";
import { useState } from "react";
import Title from "./title";

interface MnemonicProps {
  mnemonic: string;
  onConfirm: (wordsInput: string[]) => void;
}

const ConfirmMnemonic = ({ mnemonic, onConfirm }: MnemonicProps) => {
  const [wordInput, setWordInput] = useState<string[]>(Array(12).fill(""));

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="text-center text-xl font-bold">
        <Title step="mnemonic" />
      </div>
      <div className="flex justify-center items-center gap-x-2 w-full">
        <div className="w-full flex justify-center items-center gap-x-2 bg-white rounded-lg p-4">
          <div className="w-full flex justify-center items-center gap-x-2">
            <div className="w-full flex flex-col justify-between items-center gap-2">
              {mnemonic
                ?.split(" ")
                .reduce((acc: string[][], word: string, index: number) => {
                  // Create a new row every 3 words
                  if (index % 3 === 0) acc.push([]);
                  acc[acc.length - 1].push(word);
                  return acc;
                }, [])
                .map((row: string[], rowIndex: number) => (
                  <div key={rowIndex} className="flex gap-3 w-full">
                    {row?.map((_: string, index) => {
                      const overallIndex = rowIndex * 3 + index + 1;
                      console.log(overallIndex);
                      console.log(mnemonic);
                      return (
                        <input
                          key={`mnemonic-input-${overallIndex}`}
                          value={wordInput[overallIndex - 1] || ""} // Adjust for zero-based index
                          onChange={(e) => {
                            const newUserInput = [...wordInput];
                            newUserInput[overallIndex - 1] = e.target.value; // Adjust for zero-based index
                            setWordInput(newUserInput);
                          }}
                          placeholder={`word ${overallIndex}`} // Set placeholder to word index
                          className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] text-center p-5 w-full rounded-full"
                        />
                      );
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => onConfirm(wordInput)}
          className="mx-2 mb-5 shadow-md bg-gradient-to-b from-[#16A085] to-[#268f7a] w-full p-5 rounded-full text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmMnemonic;
