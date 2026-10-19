export interface CurveProfile {
  selector: string;
  mode?: "curve";
  from: [number, number];
  bend: [number, number, number, number];
  roll: number;
  bank: number;
  pitch: number;
  yaw: number;
  scale: number;
  damping: number;
  frequency: number;
  duration: number;
  delay: number;
}
export interface AnnounceProfile {
  selector: string;
  mode: "announce";
  duration: number;
  delay: number;
}
export type ArtworkProfile = CurveProfile | AnnounceProfile;
export const artworkProfiles: ArtworkProfile[] = [
  {
    selector: ".step-list li:nth-child(1) .step-art",
    from: [-34, 28],
    bend: [-20, -34, 12, -7],
    roll: -36,
    bank: 15,
    pitch: 8,
    yaw: -18,
    scale: 0.78,
    damping: 7.2,
    frequency: 7.4,
    duration: 1950,
    delay: 60,
  },
  {
    selector: ".step-list li:nth-child(2) .step-art",
    from: [30, 18],
    bend: [16, -28, -8, -8],
    roll: 24,
    bank: -14,
    pitch: 15,
    yaw: -62,
    scale: 0.74,
    damping: 7,
    frequency: 7.1,
    duration: 2100,
    delay: 140,
  },
  {
    selector: ".step-list li:nth-child(3) .step-art",
    from: [-52, 38],
    bend: [-24, 30, 26, -24],
    roll: -27,
    bank: 19,
    pitch: -10,
    yaw: 14,
    scale: 0.76,
    damping: 7.4,
    frequency: 6.8,
    duration: 2200,
    delay: 220,
  },
  {
    selector: ".faq-art",
    from: [18, 30],
    bend: [-20, 20, -14, -12],
    roll: 22,
    bank: -17,
    pitch: 12,
    yaw: -38,
    scale: 0.76,
    damping: 6.9,
    frequency: 7.8,
    duration: 2250,
    delay: 160,
  },
  {
    selector: ".creator-megaphone",
    mode: "announce",
    duration: 2400,
    delay: 100,
  },
  {
    selector: ".creator-ticket",
    from: [26, 38],
    bend: [-12, 10, 10, -10],
    roll: -28,
    bank: 18,
    pitch: 12,
    yaw: -44,
    scale: 0.7,
    damping: 7.3,
    frequency: 7.6,
    duration: 2150,
    delay: 240,
  },
  {
    selector: ".creator-star",
    from: [-20, 28],
    bend: [-24, -12, 12, -8],
    roll: -42,
    bank: 16,
    pitch: -8,
    yaw: 20,
    scale: 0.62,
    damping: 7,
    frequency: 8.1,
    duration: 2050,
    delay: 340,
  },
];
