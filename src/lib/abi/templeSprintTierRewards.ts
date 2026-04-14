export const templeSprintTierRewardsAbi = [
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "claimReward",
    inputs: [
      { name: "tier", type: "uint8" },
      { name: "week", type: "string" },
      { name: "claimId", type: "bytes32" },
      { name: "signature", type: "bytes" },
    ],
    outputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "hasClaimed",
    inputs: [{ name: "claimId", type: "bytes32" }],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;
