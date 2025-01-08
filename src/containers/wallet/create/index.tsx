"use client";

import * as bip39 from "bip39";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { toast } from "sonner";
import { TronWeb } from "tronweb";
import dynamic from "next/dynamic";

const Mnemonic = dynamic(() => import("./(components)/mnemonic"), {
  ssr: false,
});
const CreateWallet = dynamic(() => import("./(components)/createWallet"), {
  ssr: false,
});
const ConfirmMnemonic = dynamic(
  () => import("./(components)/confirmMnemonic"),
  {
    ssr: false,
  }
);

type TSteps = "mnemonic" | "confirmMnemonic" | "createWallet";
interface IData {
  mnemonic: string;
  walletAddress: string;
  privateKey: string;
}

const TronContainer = () => {
  const [step, setStep] = useState<TSteps>("mnemonic");
  const [data, setData] = useState<any>({
    mnemonic: "",
    walletAddress: "",
    privateKey: "",
  });
  const { replace } = useRouter();

  // create 12 words mnemonic for recovery wallet
  const createMnemonic = async () => {
    const generatedMnemonic = bip39.generateMnemonic();
    setData((prev: IData) => ({
      ...prev,
      mnemonic: generatedMnemonic,
    }));
  };
  // create wallet with private key hex base on 12 mnemonic
  const createWallet = async () => {
    try {
      const seed = await bip39.mnemonicToSeed(data?.mnemonic as string);
      const privateKeyBuffer = seed.slice(0, 32);
      const privateKeyHex = privateKeyBuffer.toString("hex");
      const tronWeb = new TronWeb({
        fullHost: "https://api.shasta.trongrid.io",
        privateKey: privateKeyHex,
      });
      const address = tronWeb.address.fromPrivateKey(privateKeyHex);
      setData({ walletAddress: address, privateKey: privateKeyHex });
    } catch (error) {
      toast.error("Wallet creation failed. Please try again.");
      console.log(error);
    }
  };
  // submit actions
  const changeStep = (step: TSteps) => {
    console.log(data);
    setStep(step);
  };
  const onConfirmMnemonic = (wordsInput: string[]) => {
    console.log(wordsInput, data?.mnemonic?.split(" "));
    const isMatched = wordsInput.every(
      (inputWord, idx) => inputWord.trim() === data?.mnemonic?.split(" ")[idx]
    );
    if (isMatched) {
      createWallet();
      changeStep("createWallet");
    } else {
      toast.error("Mnemonic words do not match. Please try again.");
    }
  };
  const onConfirmCreateWallet = () => {
    replace("/wallet/home");
  };
  // when render component create mnemonic
  useEffect(() => {
    if (!data?.mnemonic) {
      createMnemonic();
    }
  }, []);
  // render
  const Render = useMemo(() => {
    switch (step) {
      case "mnemonic":
        return (
          <Mnemonic
            mnemonic={data?.mnemonic}
            onConfirm={() => changeStep("confirmMnemonic")}
          />
        );
      case "confirmMnemonic":
        return (
          <ConfirmMnemonic
            mnemonic={data?.mnemonic}
            onConfirm={(wordsInput) => onConfirmMnemonic(wordsInput)}
          />
        );
      case "createWallet":
        return (
          <CreateWallet
            walletAddress={data?.walletAddress}
            privateKey={data?.privateKey}
            onConfirm={onConfirmCreateWallet}
          />
        );
    }
    return null;
  }, [step, data]);

  return (
    <div className="bg-gradient-to-b from-[#0093E9] to-[#80D0C7] h-full w-full">
      <div className="w-full flex justify-center items-center h-28">
        <h1 className="text-white font-bold text-2xl">Create New Wallet</h1>
      </div>
      <BottomSheet
        open
        style={
          {
            "--rsbs-backdrop-bg": "transparent",
          } as React.CSSProperties
        }
        snapPoints={({ minHeight }) => minHeight}
      >
        {Render}
      </BottomSheet>
    </div>
  );
};

export default TronContainer;
