export enum Screen {
  PROFILE_SETUP = "PROFILE_SETUP",
  VIBE_CALIBRATION = "VIBE_CALIBRATION",
  AI_PROFILE_GENERATED = "AI_PROFILE_GENERATED",
  SWIPE_DECK = "SWIPE_DECK",
  PROFILE_SETTINGS = "PROFILE_SETTINGS",
  EDIT_PROFILE = "EDIT_PROFILE",
}

export interface UserProfile {
  name: string;
  age: number;
  role: string;
  tags: string[];
  vibeFacts: string[];
  voiceNotesCount: number;
  referralsCount: number;
  swipeCountToday: number;
  activeDays: number;
  boostPoints: number;
  refLink: string;
  ghostMode: boolean;
  notifications: boolean;
  language: "RU" | "EN";
  avatarUrl: string;
}

export interface Candidate {
  id: string;
  name: string;
  age: number;
  role: string;
  avatarUrl: string;
  username: string;
  tags: string[];
  vibeFacts: string[];
  videoPitchUrl?: string;
  voicePitchUrl?: string;
  matchScore: number;
}
