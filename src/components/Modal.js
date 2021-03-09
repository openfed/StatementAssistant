import React, { useState, useEffect, useRef } from "react";
import { Modal as M } from "react-responsive-modal";
import { Trans } from "@lingui/macro";
import CloseIcon from "./icons/close";

export default function Modal({ children }) {
  const [open, setOpen] = useState(false);
  const [buttonPos, setButtonPos] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (modalRef.current && open) {
        const { top } = modalRef.current.getBoundingClientRect();
        window.scrollTo(0, top - 100);
      }
    }, 100);
  }, [open]);

  return (
    <div className="db">
      <a
        href="/modal"
        role="button"
        className="btn-help"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
          setButtonPos(e.currentTarget.getBoundingClientRect().top);
        }}
      >
        <Trans>Get help</Trans>
      </a>
      <M
        open={open}
        onClose={() => {
          setOpen(false);
          window.scrollTo(0, buttonPos - 100);
        }}
        center
        closeIcon={CloseIcon}
        ariaLabelledby="modal-title"
      >
        <h2 id="modal-title" ref={ modalRef }><Trans>Help</Trans></h2>
        { children }
      </M>
    </div>
  );
}
