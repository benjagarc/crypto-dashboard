export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  disableOverlayClick?: boolean;
  variant?: "default" | "success" | "warning" | "error" | "process";
}
