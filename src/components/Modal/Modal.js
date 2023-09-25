import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    }, []);

    return (
        <>
            {isOpen &&
                createPortal(
                    <div className="layer">
                        <div className="modal">
                            <p className="modal__text">{children}</p>
                            <p className="modal__text">Окно закроется через пару секунд</p>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
