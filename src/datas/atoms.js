import { atom } from "recoil";

export const language = atom({
  key: "language",
  default: "en",
});

export const languageDisplay = atom({
  key: "languageDisplay",
  default: true,
});

export const languagesList = atom({
  key: "languagesList",
  default: ["nl", "fr", "de", "en"],
});

export const ckeditorToolbar = atom({
  key: "ckeditorToolbar",
  default: [
    [
      "Bold",
      "Italic",
      "BlockQuote",
      "-",
      "Link",
      "Unlink",
      "-",
      "NumberedList",
      "BulletedList",
      "-",
      "RemoveFormat",
      "Undo",
      "Redo",
    ],
  ],
});

export const form = atom({
  key: "form",
  default: { version: 1 },
});