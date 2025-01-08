import dynamic from "next/dynamic";

const WalletContainer = dynamic(() => import("@/containers/wallet"));

export default function WalletPage() {
  return <WalletContainer />;
}
