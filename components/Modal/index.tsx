// src/components/Modal.jsx
import React, { FC } from "react";
import { ModalProps } from "./interface";
import { variantStyles } from "./variant";

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "default",
}) => {
  if (!isOpen) return null;

  const styles = variantStyles[variant];
  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div
        className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white/80 text-gray-800 border border-white/30  ${styles.animation}`}
      >
        <button
          className="absolute top-2 right-2 text-black/60 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col items-center mb-4">
          {variant !== "default" && (
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold ${styles.iconBg}`}
            >
              {styles.icon}
            </div>
          )}
          <h2 className="text-xl font-semibold mt-3">{title}</h2>
        </div>

        <div className="text-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
