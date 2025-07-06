// layouts/Modal.jsx
import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-primary">{title}</h3>
                <div className="py-4">
                    {children}
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                    </form>
                </div>
            </div>
             {/* Klik di luar untuk menutup modal */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default Modal;