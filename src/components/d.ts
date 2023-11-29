// types.ts
type SoundAsset = {
  src: string;
  volume?: number;
  // Add other properties as needed
};

type SoundAssets = {
  gameOver: SoundAsset;
  click: SoundAsset;
  // Add more assets as needed
};
