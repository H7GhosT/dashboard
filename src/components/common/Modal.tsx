import React, { ReactNode, useEffect, useRef } from "react";

import { composeClass } from "components/utils";
import { Surface } from "components/common";

export interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  surfaceElevation?: number;
}

export function Modal({
  open,
  children,
  surfaceElevation = 4,
  onClose,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    if (open) {
      Modal.openedModals.add(modalRef);
    } else {
      Modal.openedModals.delete(modalRef);
    }
    if (Modal.openedModals.size) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [open]);

  return (
    <div
      ref={modalRef}
      className={composeClass("modal", { open })}
      onClick={(e) => {
        if (e.target == modalRef.current) {
          onClose();
        }
      }}
    >
      <div className="modal__content">
        <Surface elevation={surfaceElevation}>{children}</Surface>
      </div>
    </div>
  );
}

Modal.openedModals = new Set();
