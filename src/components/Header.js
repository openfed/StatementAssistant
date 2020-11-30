import React from "react";
import { Trans } from "@lingui/macro";
import LanguageSwiter from "./LanguageSwitcher";
import { useRecoilValue } from "recoil";
import { languageDisplay } from "../datas/atoms";

export default function Header() {
  const lDisplay = useRecoilValue(languageDisplay);

  return (
    <header>
      {lDisplay && <LanguageSwiter />}      
      {/* The h1 is visually hidden because this app is supposed to be in an </Iframe> */}
      <h1 className="visually-hidden"><Trans>Wizard for filling the accessibility statement</Trans></h1>
    </header>
  );
}
