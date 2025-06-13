export interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  variant: "default" | "success" | "warning" | "error";
}

export interface ModalContextType {
  showModal: (params: Omit<ModalState, "isOpen">) => void;
  closeModal: () => void;
}
