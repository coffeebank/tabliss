import { DB, Storage } from "../lib";
import { defaultLocale } from "../locales";

/**
 * Database state
 */
export interface State {
  /** Background state */
  background: BackgroundState;
  /** Widget state */
  [key: `widget/${string}`]: WidgetState | null;
  /** Plugin data */
  [key: `data/${string}`]: unknown;
  /** Whether focus has been activated */
  focus: boolean;
  /** Locale selected */
  locale: string;
  /** Time zone selected, if any */
  timeZone: string | null;
}

export interface BackgroundState {
  id: string;
  key: string;
  display: BackgroundDisplay;
}

export interface BackgroundDisplay {
  blur?: number;
  luminosity?: number;
}

export interface WidgetState {
  id: string;
  key: string;
  order: number;
  display: WidgetDisplay;
}

export interface WidgetDisplay {
  colour?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  position: WidgetPosition;
}

export type WidgetPosition =
  | "topLeft"
  | "topCentre"
  | "topRight"
  | "middleLeft"
  | "middleCentre"
  | "middleRight"
  | "bottomLeft"
  | "bottomCentre"
  | "bottomRight";

// Init data for the store
const initData: State = {
  background: {
    id: "2b4ZpJsXz-eu",
    key: "background/gradient",
    display: {
      luminosity: -0.2,
      blur: 0,
    },
  },
  "data/2b4ZpJsXz-eu": {
    "angle": 315,
    "from": "#727de6",
    "to": "#055fa6",
    "type": "linear-gradient"
  },
  "widget/cBUFb-87HbZl": null,
  "widget/default-time": {
    "id": "default-time",
    "key": "widget/time",
    "order": 2,
    "display": {
      "position": "middleCentre",
      "fontSize": 16
    }
  },
  "widget/default-greeting": null,
  "widget/s5srpiImAL7k": {
    "id": "s5srpiImAL7k",
    "key": "widget/time",
    "order": 0,
    "display": {
      "position": "middleCentre"
    }
  },
  "data/s5srpiImAL7k": {
    "mode": "analogue",
    "hour12": false,
    "showDate": false,
    "showMinutes": true,
    "showSeconds": true,
    "showDayPeriod": true,
    "timeZone": null
  },
  "data/default-time": {
    "mode": "digital",
    "hour12": true,
    "showDate": true,
    "showMinutes": true,
    "showSeconds": false,
    "showDayPeriod": true,
    "timeZone": null
  },
  "widget/4pFQD6T7K99e": {
    "id": "4pFQD6T7K99e",
    "key": "widget/time",
    "order": 1,
    "display": {
      "position": "middleCentre",
      "fontSize": 8
    }
  },
  "widget/wGENxLTxeh1L": null,
  "widget/Tebollcmqy5c": null,
  "widget/Qcd30bAQG-jp": {
    "id": "Qcd30bAQG-jp",
    "key": "widget/message",
    "order": 3,
    "display": {
      "position": "middleCentre",
      "fontSize": 16
    }
  },
  "data/Qcd30bAQG-jp": {
    "messages": [
      "\n\nWelcome to New Tab Page!\n\nCustomize it using the ⚙ icon\non the top left corner :)\n\n(=^･ω･^=))ﾉ彡☆"
    ]
  },
  focus: false,
  locale: defaultLocale,
  timeZone: null,
};

// Database storage
export const db = DB.init<State>(initData);

// Cache storage
export const cache = DB.init<Record<string, unknown | undefined>>();

// Persist data
export const dbStorage =
  BUILD_TARGET === "web"
    ? Storage.indexeddb(db, "tabliss/config")
    : Storage.extension(db, "tabliss/config", "sync");

export const cacheStorage =
  BUILD_TARGET === "firefox"
    ? Storage.extension(cache, "tabliss/cache", "local")
    : Storage.indexeddb(cache, "tabliss/cache");
