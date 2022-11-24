/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, toggle }) => {
  return isOpen ? (
    <button
      className="absolute top-0 z-[9999] flex h-screen w-screen cursor-default items-center justify-center bg-[rgba(0,0,0,0.7)]"
      onClick={toggle}
    >
      <div
        className="flex h-3/6 w-full flex-col items-center justify-center gap-4 rounded-sm bg-light-120 p-4 md:h-[50%]  md:w-[50%] md:flex-row md:gap-12"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </button>
  ) : null;
};

export default Modal;
