import "../../styles/modal.css";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string; 
    children: React.ReactNode; 
  }
  
  export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <dialog className="modal-overlay" open onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
  
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
           
          {title && <h2>{title}</h2>}
    
          <div className="modal-body">{children}</div>
        </div>
      </dialog>
    );
  };