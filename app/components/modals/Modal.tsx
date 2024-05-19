'use client';

import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    label: string;
    close: () => void;
    content: React.ReactElement;
    isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
    label,
    content,
    isOpen,
    close
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        }
    }, [isOpen]);

    const handleClose = useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            close();
        }, 300); // Ensure this matches the CSS transition duration
    }, [close]);

    if (!isOpen) {
        return null; // Prevent rendering when modal is closed
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
                <div className={`transform transition-transform duration-300 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <div className="w-full h-auto rounded-xl relative flex flex-col bg-white shadow-lg">
                        <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
                            <div 
                                onClick={handleClose}
                                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                            >
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold">{label}</h2>
                        </header>
                        <section className="p-6">
                            {content}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
