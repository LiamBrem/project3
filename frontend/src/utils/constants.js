export const SORT_OPTIONS = {
  ALL: "all",
  RECENT: "recent",
  CELEBRATION: "celebration",
  THANK_YOU: "thankYou",
  INSPIRATION: "inspiration",
};

export const CATEGORIES = [
  SORT_OPTIONS.CELEBRATION,
  SORT_OPTIONS.THANK_YOU,
  SORT_OPTIONS.INSPIRATION,
];

export const CONNECTION_URL = import.meta.env.VITE_CONNECTION_URL || "http://localhost:3000";
