// src/components/Modal.jsx
import React, { FC } from "react";
import { ModalProps } from "./interface";

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="relative w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white/80 border border-white/30 backdrop-blur-lg text-gray-800">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
