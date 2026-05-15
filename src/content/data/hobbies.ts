export type Hobby = {
  title: string;
  category: "MUSIC" | "BUILD" | "OUTDOOR" | "GAME";
  blurb: string;
  detail?: string;
};

export const HOBBIES: Hobby[] = [
  {
    title: "Guitar & home studio",
    category: "MUSIC",
    blurb:
      "Working musician. Records and produces originals — released on iTunes and Google Play.",
    detail: "REAPER · PositiveGrid BIAS · 7-string · drop-tuned riffs",
  },
  {
    title: "Wakeboarding",
    category: "OUTDOOR",
    blurb:
      "Competed in Men's Cable Park 2019. Still chasing line cuts on the local rope.",
    detail: "Okanagan summers · cable + boat",
  },
  {
    title: "IoT & growth chambers",
    category: "BUILD",
    blurb:
      "ESP32 sensors, a Raspberry Pi running MPC, MQTT as the spine — a living workshop project that also keeps the basement chamber dialled in.",
    detail: "MicroPython · OSQP · EKF · Ollama on-device",
  },
  {
    title: "Game tinkering",
    category: "GAME",
    blurb:
      "Long-time GameMaker hobbyist; Clone Hero for warming the wrists between commits.",
    detail: "GameMaker Studio 2 · ASCII roguelike experiments",
  },
  {
    title: "Writing",
    category: "BUILD",
    blurb:
      "Occasional essays on agency economics, judgment as a priced layer, and how AI is reshaping creative services.",
    detail: "Medium · @curtis.blanchette",
  },
  {
    title: "Coaching / culture",
    category: "BUILD",
    blurb:
      "Years of leading remote teams. Hiring, coaching, and protecting developmental friction against velocity pressure.",
    detail: "1:1s · skill ladders · feedback rituals",
  },
];
