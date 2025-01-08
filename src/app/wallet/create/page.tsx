import dynamic from "next/dynamic";

const WalletCreateContainer = dynamic(
  () => import("@/containers/wallet/create")
);

export default function WalletCreatePage() {
  return <WalletCreateContainer />;
}
