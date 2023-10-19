type Chain = {
  id: number;
  hex: string;
  token: string;
  rpcUrl: string;
  shortName: string;
  label: string;
  color?: string;
  icon?: string;
  blockExplorerUrl?: string;
  transactionServiceUrl?: string;
  isStripePaymentsEnabled?: boolean; // only available in Mumbai chain
  isMoneriumPaymentsEnabled?: boolean; // only available in Goerli chain
  faucetUrl?: string;
  paymaster?: string;
};

export default Chain;
