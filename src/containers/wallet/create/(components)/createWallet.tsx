import Title from "./title";

interface ICreateWallet {
  walletAddress: string;
  privateKey: string;
  onConfirm: () => void;
}
const CreateWallet = ({
  walletAddress,
  privateKey,
  onConfirm,
}: ICreateWallet) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="text-center text-xl font-bold">
        <Title step="createWallet" />
      </div>
      <div className="flex justify-center items-center gap-x-2 w-full">
        <div className="w-full flex justify-center items-center gap-x-2 bg-white rounded-lg p-4">
          <div className="w-full flex justify-center items-center gap-x-2">
            <div className="w-full flex flex-col justify-between items-center gap-2">
              <span>Wallet Address</span>
              <div className="bg-gray-100 rounded-lg p-2 w-full">
                <span className="text-gray-500">{walletAddress}</span>
              </div>
              <span>Private Key</span>
              <div className="bg-gray-100 rounded-lg p-2 w-full">
                <p className="text-gray-500 overflow-auto">{privateKey}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={onConfirm}
          className="mx-2 mb-5 shadow-md bg-gradient-to-b from-[#16A085] to-[#268f7a] w-full p-5 rounded-full text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CreateWallet;
