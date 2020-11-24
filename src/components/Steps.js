import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link, useHistory } from "react-router-dom";
import { Trans, t } from "@lingui/macro";
import { withI18n } from "@lingui/react";
import { form as formAtom } from "../datas/atoms";

const Result = ({ i18n, step }) => {
  let history = useHistory();
  const form = useRecoilValue(formAtom);

  const [menu, setMenu] = useState(step);

  function handleMenu(e) {
    setMenu(e.target.value);
    history.push("step" + e.target.value);
  }

  return (
    <>
      <nav className="steps row">
        <ul>
          {/* Cannot loop otherwise the translation doesn't work */}
          <li className={step === 1 ? "is-active" : ""}>
            {step > 1 || (form.hasOwnProperty("step1") && step !== 1) ? (
              <Link to="/step1">
                <span>1</span>. <Trans>Identification</Trans>
              </Link>
            ) : (
              <span>
                <span>1</span>. <Trans>Identification</Trans>
              </span>
            )}
          </li>
          <li className={step === 2 ? "is-active" : ""}>
            {step > 2 || (form.hasOwnProperty("step2") && step !== 2) ? (
              <Link to="/step2">
                <span>2</span>. <Trans>Level of compliance</Trans>
              </Link>
            ) : (
              <span>
                <span>2</span>. <Trans>Level of compliance</Trans>
              </span>
            )}
          </li>
          <li className={step === 3 ? "is-active" : ""}>
            {step > 3 || (form.hasOwnProperty("step3") && step !== 3) ? (
              <Link to="/step3">
                <span>3</span>. <Trans>Non-accessible content</Trans>
              </Link>
            ) : (
              <span>
                <span>3</span>. <Trans>Non-accessible content</Trans>
              </span>
            )}
          </li>
          <li className={step === 4 ? "is-active" : ""}>
            {step > 4 || (form.hasOwnProperty("step4") && step !== 4) ? (
              <Link to="/step4">
                <span>4</span>. <Trans>Exemptions</Trans>
              </Link>
            ) : (
              <span>
                <span>4</span>. <Trans>Exemptions</Trans>
              </span>
            )}
          </li>
          <li className={step === 5 ? "is-active" : ""}>
            {step > 5 || (form.hasOwnProperty("step5") && step !== 5) ? (
              <Link to="/step5">
                <span>5</span>. <Trans>Contact information</Trans>
              </Link>
            ) : (
              <span>
                <span>5</span>. <Trans>Contact information</Trans>
              </span>
            )}
          </li>
          <li className={step === 6 ? "is-active" : ""}>
            {step > 6 || (form.hasOwnProperty("step6") && step !== 6) ? (
              <Link to="/step6">
                <span>6</span>. <Trans>In conclusion</Trans>
              </Link>
            ) : (
              <span>
                <span>6</span>. <Trans>In conclusion</Trans>
              </span>
            )}
          </li>
        </ul>
      </nav>

      <form className="steps row">
        <label className="visually-hidden" htmlFor="menu">
          <Trans>Menu</Trans>
        </label>
        <select name="menu" id="menu" value={menu} onChange={handleMenu}>
          <option value="1">1. {i18n._(t`Identification`)}</option>
          <option value="2">2. {i18n._(t`Level of compliance`)}</option>
          <option value="3">3. {i18n._(t`Non-accessible content`)}</option>
          <option value="4">4. {i18n._(t`Exemptions`)}</option>
          <option value="5">5. {i18n._(t`Contact information`)}</option>
          <option value="6">6. {i18n._(t`In conclusion`)}</option>
        </select>
        <button tabIndex="-1" className="visually-hidden">
          <Trans>Ok</Trans>
        </button>
      </form>
    </>
  );
};

export default withI18n()(Result);
