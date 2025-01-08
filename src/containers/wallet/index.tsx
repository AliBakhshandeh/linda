"use client";
import Image from "next/image";
import Link from "next/link";
import { BottomSheet } from "react-spring-bottom-sheet";

const Wallet = () => {
  return (
    <div className="bg-sky-700 h-full w-full">
      <BottomSheet
        style={
          {
            "--rsbs-backdrop-bg": "transparent",
          } as React.CSSProperties
        }
        open
        snapPoints={({ minHeight }) => minHeight}
        defaultSnap={500}
      >
        <div className="flex justify-evenly w-full h-full min-h-[350px] items-center">
          <Link href="/wallet/recovery">
            <div className="flex justify-center items-center flex-col gap-y-2">
              <div className="min-w-32 min-h-32 flex justify-center items-center shadow-lg bg-gradient-to-t from-[#c5e0ee] to-[#ffbfb9] rounded-full">
                <Image
                  src="https://icons.veryicon.com/png/o/system/background-management-system-2/import-86.png"
                  alt="import wallet"
                  width={80}
                  height={80}
                />
              </div>
              <div className="text-xl font-bold">Import Wallet</div>
            </div>
          </Link>
          <Link href="/wallet/create">
            <div className="flex justify-center items-center flex-col gap-y-2">
              <div className="min-w-32 min-h-32 flex justify-center items-center shadow-lg bg-gradient-to-t from-[#c5e0ee] to-[#ffbfb9] rounded-full">
                <Image
                  src="https://icons.veryicon.com/png/o/object/linear-life-icon-different-line-thicknesses/wallet-311.png"
                  alt="import wallet"
                  width={80}
                  height={80}
                />
              </div>
              <div className="text-xl font-bold">New Wallet</div>
            </div>
          </Link>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Wallet;
