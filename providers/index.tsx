"use client";
import { createContext, useContext, useEffect, useState } from "react";

export async function getEthPrice() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const content = await res.json();
  return content.ethereum.usd;
}
const stateContext = createContext<any>(null);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    async function fetchETHprice() {
      const price = await getEthPrice();
      setEthPrice(price);
    }
    fetchETHprice();
  }, []);

  return (
    <stateContext.Provider
      value={{
        ethPrice,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const StateContext = () => useContext(stateContext);
