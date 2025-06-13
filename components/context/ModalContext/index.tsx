'use client';

import Modal from "@/components/Modal/index";
import { createContext, useContext, useState } from "react";
import { ModalContextType, ModalState } from "./interface";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal debe usarse dentro de ModalProvider");
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: "",
    content: null,
    variant: "default",
  });

  const showModal = ({
    title,
    content,
    variant,
  }: Omit<ModalState, "isOpen">) => {
    setModal({ isOpen: true, title, content, variant });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        variant={modal.variant}
      >
        {modal.content}
      </Modal>
    </ModalContext.Provider>
  );
};
