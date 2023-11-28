export async function fetchETHprice() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;
  const res = await fetch(url);
  const content = await res.json();
  return content.ethereum.usd;
}