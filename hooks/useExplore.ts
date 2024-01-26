import { useNetwork } from "wagmi";

export default function useExplore() {
  const { chain } = useNetwork();
  return chain?.blockExplorers?.default.url;
}
