// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, newIssue, handleNewIssueChange }) => {
    
    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Add New Issue</h2>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={newIssue}
                        onChange={handleNewIssueChange}
                        className="issue-headline"
                    />

                    <br></br>
                    <br></br>

                    <div>Acting Authority</div>
                    <br></br>
                    <select>
                        <option>Central Beaureau of Investigation</option>
                        <option>National Crime Investigation Beaureau</option>
                        <option>Crime Research Investigation Agency of India</option>
                        <option>IGI</option>
                    </select>

                    <br></br>
                    <br></br>

                    <input
                        type="text"
                        placeholder="Description"
                        value={newIssue}
                        onChange={handleNewIssueChange}
                        className="issue-dexcription"
                    />
                    <br></br>
                    <br></br>
                    <br></br>

                    <button onClick={onSubmit} className="issue-submit">Submit</button>
                </div>
            </div>
        )
    );
};

export default Modal;
