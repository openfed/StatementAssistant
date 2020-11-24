import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { language, languagesList } from "../datas/atoms";

export default function LanguageSwiter() {
  // eslint-disable-next-line
  const [lang, setLang] = useRecoilState(language);
  const lList = useRecoilValue(languagesList);

  return (
    <div className="language-switcher mb-30">
      <ul>
        {lList.map((l) => {
          return (
            <li key={l} className={`${lang === l ? "is-active" : ""}`}>
              <button onClick={() => setLang(l)}>{l}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
