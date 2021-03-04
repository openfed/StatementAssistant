import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Trans } from "@lingui/macro";
import { Link, useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from "./Header";
import Statement from "./Statement";
import Save from "./Save";
import { form as formAtom } from "../datas/atoms";

export default function Result() {
  let history = useHistory();
  const form = useRecoilValue(formAtom);
  const [html, setHtml] = useState("");
  const myRef = useRef();

  useEffect(() => {
    if (!form.hasOwnProperty("step1")) {
      history.push("/");
    }

    setHtml(myRef.current.innerHTML);
    // eslint-disable-next-line
  }, []);

  function saveForm() {
    return true;
  }

  return (
    <div className="result container-fluid">
      <Header />
      <h2 className="text-center">
        <Trans>Success!</Trans>
      </h2>
      <p className="text-center">
        <Trans>
          Your accessibility statement has been generated. You can copy the HTML
          via the button below. Remember that a link to your accessibility
          declaration must be present in the footer of your site.
        </Trans>
      </p>
      <p className="text-center">
        <Trans>
          This accessibility declaration must be re-read and completed if
          necessary by your organization. It is indeed your responsibility.
        </Trans>
      </p>
      <p className="text-center">
        <Trans>
          It must be updated every time your site is modified in a major way
          and, as far as possible, updated every year.
        </Trans>
      </p>

      <div className="controls">
        <div>
          <Link to="/step6" className="btn prev">
            <Trans>Previous</Trans>
          </Link>
        </div>
        <div className="text-right">
          <Save saveForm={saveForm} />
          {form.hasOwnProperty("step1") && (
            <CopyToClipboard onCopy={() => {}} text={html}>
              <button className="btn-copy">
                <Trans>Copy the HTML to the clipboard</Trans>
              </button>
            </CopyToClipboard>
          )}
        </div>
      </div>

      {/* Need a dummy to copy the right HTML */}
      <div aria-hidden="true" ref={myRef} style={{ display: "none" }}>
        {form.hasOwnProperty("step1") && <Statement form={form} raw={true} />}
      </div>

      <div className="wrapper">
        <h2 className="title">
          <Trans>Your declaration</Trans>
        </h2>
        <hr />
        <section className="preview">
          {form.hasOwnProperty("step1") && (
            <Statement form={form} raw={false} />
          )}
        </section>
      </div>
    </div>
  );
}
