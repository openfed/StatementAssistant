import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { form as formAtom } from "../datas/atoms";
import { Trans } from "@lingui/macro";

export default function Result({ saveForm }) {
  const version = 1;
  const form = useRecoilValue(formAtom);
  const [integer, setInterger] = useState(1);

  function download() {
    saveForm();
    setInterger((oldInteger) => oldInteger + 1);
  }

  useEffect(() => {
    if (integer > 1) {
      let app = "unknown";
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();

      if (
        form.step1 &&
        form.step1.organization &&
        form.step1.organization !== ""
      ) {
        app = form.step1.organization;
      }

      var FileSaver = require("file-saver");
      var blob = new Blob([JSON.stringify(form, null, 2)], {
        type: "application/json;charset=utf-8",
      });

      FileSaver.saveAs(
        blob,
        `accessibility-statement-v${version}-${app}-${yyyy}-${mm}-${dd}.json`
      );
    }
    // eslint-disable-next-line
  }, [integer]);

  return (
    <a
      href="/dl"
      role="button"
      onClick={(e) => {
        e.preventDefault();
        download();
      }}
      className="btn btn-save"
      style={{ display: "none" }}
    >
      <Trans>Save my form</Trans>
    </a>
  );
}
