import React from "react";
import "./styles/css/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { I18nProvider } from "@lingui/react";
import { useRecoilValue } from "recoil";
import { language } from "./datas/atoms";
import catalogDe from "./locales/de/messages.js";
import catalogEn from "./locales/en/messages.js";
import catalogFr from "./locales/fr/messages.js";
import catalogNl from "./locales/nl/messages.js";
import Home from "./components/Home";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import Result from "./components/Result";

const catalogs = {
  de: catalogDe,
  en: catalogEn,
  fr: catalogFr,
  nl: catalogNl,
};

export default function App() {
  const lang = useRecoilValue(language);

  return (
    <I18nProvider language={lang} catalogs={catalogs}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/step1">
            <Step1 />
          </Route>
          <Route path="/step2">
            <Step2 />
          </Route>
          <Route path="/step3">
            <Step3 />
          </Route>
          <Route path="/step4">
            <Step4 />
          </Route>
          <Route path="/step5">
            <Step5 />
          </Route>
          <Route path="/step6">
            <Step6 />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </I18nProvider>
  );
}
