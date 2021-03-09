import React, { useState, useEffect, useRef } from "react";
import { Modal as M } from "react-responsive-modal";
import { Trans } from "@lingui/macro";
import CloseIcon from "./icons/close";

export default function Modal({ children }) {
  const [open, setOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
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

          if ('parentIFrame' in window) {
            window.parentIFrame.getPageInfo((page) => {
              setScrollPos(page.scrollTop);
              window.parentIFrame.getPageInfo(false);
            });
          } else {
            setScrollPos(document.documentElement.scrollTop);
          }
        }}
      >
        <Trans>Get help</Trans>
      </a>
      <M
        open={open}
        onClose={() => {
          setOpen(false);
          window.scrollToOrig(0, scrollPos);
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
