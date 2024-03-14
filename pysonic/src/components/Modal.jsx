import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Open
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Shortcuts</h2>
                        <p>
                            <strong>Ctrl+F5:</strong> Compile the code.<br />
                            <strong>Ctrl+Shift+M:</strong> Check for errors.<br />
                            <strong>Ctrl+Shift+G:</strong> Go to a specific line number.<br />
                            <strong>Ctrl+Shift+S:</strong> Open/close shortcut list.<br />
                            <strong>Ctrl+Home:</strong> Go to line 1.<br />
                            <strong>ArrowLeft, ArrowRight, ArrowUp, ArrowDown:</strong> Move text cursor left/right by 1/5 characters.<br />
                            <strong>Enter</strong>: Go to next line.<br />
                            <strong>Tab/Shift+Untab</strong> Go to next/previous indent within line.
                        </p>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
            <p>Press CTRL+Shift+S to show all shortcuts.</p>
            </>
    );
}