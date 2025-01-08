import dynamic from "next/dynamic";

const WalletRecoveryContainer = dynamic(
  () => import("@/containers/wallet/recovery")
);

export default function WalletRecoveryPage() {
  return <WalletRecoveryContainer />;
}
