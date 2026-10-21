import inklabsReel1 from "@/assets/reels/inklabs-reel-1.mp4";
import inklabsPoster1 from "@/assets/reels/inklabs-reel-1.webp";
import inklabsReel2 from "@/assets/reels/inklabs-reel-2.mp4";
import inklabsPoster2 from "@/assets/reels/inklabs-reel-2.webp";
import inklabsReel3 from "@/assets/reels/inklabs-reel-3.mp4";
import inklabsPoster3 from "@/assets/reels/inklabs-reel-3.webp";
import inklabsReel4 from "@/assets/reels/inklabs-reel-4.mp4";
import inklabsPoster4 from "@/assets/reels/inklabs-reel-4.webp";

// Vertical 9:16 reels, compressed to 540×960 with a poster frame each.
export type ReelSrc = { video: string; poster: string };
export const reels = {
  "inklabs-reel-1": { video: inklabsReel1, poster: inklabsPoster1 },
  "inklabs-reel-2": { video: inklabsReel2, poster: inklabsPoster2 },
  "inklabs-reel-3": { video: inklabsReel3, poster: inklabsPoster3 },
  "inklabs-reel-4": { video: inklabsReel4, poster: inklabsPoster4 },
} satisfies Record<string, ReelSrc>;
export type ReelKey = keyof typeof reels;
