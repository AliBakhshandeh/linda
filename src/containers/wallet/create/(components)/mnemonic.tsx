"use client";

import { BottomSheet } from "react-spring-bottom-sheet";
import Title from "./title";
import { useState } from "react";

interface MnemonicProps {
  mnemonic: string;
  onConfirm: () => void;
}
const Mnemonic = ({ mnemonic, onConfirm }: MnemonicProps) => {
  const [isShowConfirmBottomSheet, setIsShowConfirmBottomSheet] =
    useState<boolean>(false);
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
                    {row?.map((word, wordIndex) => (
                      <p
                        key={wordIndex}
                        className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] text-center p-5 w-full rounded-full"
                      >
                        {word}
                      </p>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => setIsShowConfirmBottomSheet(true)}
          className="mx-2 mb-5 shadow-md bg-gradient-to-b from-[#16A085] to-[#268f7a] w-full p-5 rounded-full text-white"
        >
          Confirm
        </button>
      </div>
      <BottomSheet
        onDismiss={() => setIsShowConfirmBottomSheet(false)}
        open={isShowConfirmBottomSheet}
      >
        <p className="p-5">
          We want to remind you about the critical importance of securing your
          12-word wallet recovery phrase. This phrase is your key to accessing
          your cryptocurrency funds, and losing it can result in permanent loss
          of access to your assets.
        </p>
        <div className="flex gap-3 mx-2 mb-4">
          <button
            onClick={onConfirm}
            className="shadow-md bg-gradient-to-b from-[#16A085] to-[#268f7a] w-full p-5 rounded-full text-white"
          >
            confirm
          </button>
          <button className="text-lg shadow-md bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] w-full p-5 rounded-full">
            back
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Mnemonic;
