"use client";

import { memo, useMemo } from "react";

interface TitleProps {
  step: string;
}

const Title = ({ step }: TitleProps) => {
  const header = useMemo(() => {
    switch (step) {
      case "mnemonic":
        return "Generate Mnemonic";
      case "confirmMnemonic":
        return "Confirm Mnemonic";
      case "createWallet":
        return "Create Wallet";
    }
  }, [step]);
  return (
    <h2 className="text-center text-xl font-bold pb-2 mb-2 border-b-2">
      {header}
    </h2>
  );
};

export default memo(Title);
