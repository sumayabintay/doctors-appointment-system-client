import React from 'react'

export default function ConfirmationModal({title, message, closeModal, modalData, successAction, successButtonName}) {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg"> {title} </h3>
                    <p className="py-4"> {message} </p>
                    <div className="modal-action">
                        <label 
                        onClick={()=> successAction(modalData)} 
                        htmlFor="confirmation-modal" 
                        className="btn btn-error">{successButtonName}</label>
                        <button 
                        onClick={closeModal} 
                        className='btn btn-primary'> Cancel </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
