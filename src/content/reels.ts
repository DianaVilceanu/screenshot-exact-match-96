import inklabsReel1 from "@/assets/reels/inklabs-reel-1.mp4";
import inklabsPoster1 from "@/assets/reels/inklabs-reel-1.webp";
import inklabsReel2 from "@/assets/reels/inklabs-reel-2.mp4";
import inklabsPoster2 from "@/assets/reels/inklabs-reel-2.webp";
import inklabsReel3 from "@/assets/reels/inklabs-reel-3.mp4";
import inklabsPoster3 from "@/assets/reels/inklabs-reel-3.webp";
import inklabsReel4 from "@/assets/reels/inklabs-reel-4.mp4";
import inklabsPoster4 from "@/assets/reels/inklabs-reel-4.webp";
import kdtReel1 from "@/assets/reels/kdt-reel-1.mp4";
import kdtPoster1 from "@/assets/reels/kdt-reel-1.webp";
import kdtReel2 from "@/assets/reels/kdt-reel-2.mp4";
import kdtPoster2 from "@/assets/reels/kdt-reel-2.webp";
import kdtReel3 from "@/assets/reels/kdt-reel-3.mp4";
import kdtPoster3 from "@/assets/reels/kdt-reel-3.webp";
import kdtReel4 from "@/assets/reels/kdt-reel-4.mp4";
import kdtPoster4 from "@/assets/reels/kdt-reel-4.webp";
import divazReel1 from "@/assets/reels/divaz-reel-1.mp4";
import divazPoster1 from "@/assets/reels/divaz-reel-1.webp";
import divazReel2 from "@/assets/reels/divaz-reel-2.mp4";
import divazPoster2 from "@/assets/reels/divaz-reel-2.webp";
import divazReel3 from "@/assets/reels/divaz-reel-3.mp4";
import divazPoster3 from "@/assets/reels/divaz-reel-3.webp";
import divazReel4 from "@/assets/reels/divaz-reel-4.mp4";
import divazPoster4 from "@/assets/reels/divaz-reel-4.webp";
import iqReel1 from "@/assets/reels/iq-reel-1.mp4";
import iqPoster1 from "@/assets/reels/iq-reel-1.webp";
import iqReel2 from "@/assets/reels/iq-reel-2.mp4";
import iqPoster2 from "@/assets/reels/iq-reel-2.webp";
import iqReel3 from "@/assets/reels/iq-reel-3.mp4";
import iqPoster3 from "@/assets/reels/iq-reel-3.webp";
import iqReel4 from "@/assets/reels/iq-reel-4.mp4";
import iqPoster4 from "@/assets/reels/iq-reel-4.webp";
import kurbeReel1 from "@/assets/reels/kurbe-reel-1.mp4";
import kurbePoster1 from "@/assets/reels/kurbe-reel-1.webp";
import kurbeReel2 from "@/assets/reels/kurbe-reel-2.mp4";
import kurbePoster2 from "@/assets/reels/kurbe-reel-2.webp";
import kurbeReel3 from "@/assets/reels/kurbe-reel-3.mp4";
import kurbePoster3 from "@/assets/reels/kurbe-reel-3.webp";
import kurbeReel4 from "@/assets/reels/kurbe-reel-4.mp4";
import kurbePoster4 from "@/assets/reels/kurbe-reel-4.webp";
import kurbeReel5 from "@/assets/reels/kurbe-reel-5.mp4";
import kurbePoster5 from "@/assets/reels/kurbe-reel-5.webp";
import kurbeReel6 from "@/assets/reels/kurbe-reel-6.mp4";
import kurbePoster6 from "@/assets/reels/kurbe-reel-6.webp";
import kurbeReel7 from "@/assets/reels/kurbe-reel-7.mp4";
import kurbePoster7 from "@/assets/reels/kurbe-reel-7.webp";

// Vertical 9:16 reels with a poster frame each (Inklabs at 540×960, the rest at 720×1280).
export type ReelSrc = { video: string; poster: string };
export const reels = {
  "inklabs-reel-1": { video: inklabsReel1, poster: inklabsPoster1 },
  "inklabs-reel-2": { video: inklabsReel2, poster: inklabsPoster2 },
  "inklabs-reel-3": { video: inklabsReel3, poster: inklabsPoster3 },
  "inklabs-reel-4": { video: inklabsReel4, poster: inklabsPoster4 },
  "kdt-reel-1": { video: kdtReel1, poster: kdtPoster1 },
  "kdt-reel-2": { video: kdtReel2, poster: kdtPoster2 },
  "kdt-reel-3": { video: kdtReel3, poster: kdtPoster3 },
  "kdt-reel-4": { video: kdtReel4, poster: kdtPoster4 },
  "divaz-reel-1": { video: divazReel1, poster: divazPoster1 },
  "divaz-reel-2": { video: divazReel2, poster: divazPoster2 },
  "divaz-reel-3": { video: divazReel3, poster: divazPoster3 },
  "divaz-reel-4": { video: divazReel4, poster: divazPoster4 },
  "iq-reel-1": { video: iqReel1, poster: iqPoster1 },
  "iq-reel-2": { video: iqReel2, poster: iqPoster2 },
  "iq-reel-3": { video: iqReel3, poster: iqPoster3 },
  "iq-reel-4": { video: iqReel4, poster: iqPoster4 },
  "kurbe-reel-1": { video: kurbeReel1, poster: kurbePoster1 },
  "kurbe-reel-2": { video: kurbeReel2, poster: kurbePoster2 },
  "kurbe-reel-3": { video: kurbeReel3, poster: kurbePoster3 },
  "kurbe-reel-4": { video: kurbeReel4, poster: kurbePoster4 },
  "kurbe-reel-5": { video: kurbeReel5, poster: kurbePoster5 },
  "kurbe-reel-6": { video: kurbeReel6, poster: kurbePoster6 },
  "kurbe-reel-7": { video: kurbeReel7, poster: kurbePoster7 },
} satisfies Record<string, ReelSrc>;
export type ReelKey = keyof typeof reels;
