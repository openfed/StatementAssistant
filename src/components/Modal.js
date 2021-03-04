import React, { useState } from "react";
import { Modal as M } from "react-responsive-modal";
import { Trans } from "@lingui/macro";
import CloseIcon from "./icons/close";

export default function Modal({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="db">
      <a
        href="/modal"
        role="button"
        className="btn-help"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <Trans>Get help</Trans>
      </a>
      <M
        open={open}
        onClose={() => setOpen(false)}
        center
        closeIcon={CloseIcon}
        ariaLabelledby="modal-title"
      >
        <h2 id="modal-title"><Trans>Help</Trans></h2>
        { children }
      </M>
    </div>
  );
}
