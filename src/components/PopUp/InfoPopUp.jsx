import './InfoPopUp.css'

function InfoPopUp({isOpen, onClose, children}) {
    const onWrapperClick = (event) => {
        if (event.target.classList.contains("modal-wrapper")) onClose()
    }

    return (
        <>
        {isOpen && (
        <div className="modal" onClick={(event)=>event.stopPropagation()}>
            <div className="modal-wrapper" onClick={onWrapperClick}>
                <div className="modal-content">
                    <label className="modal-close-button" onClick={()=> onClose()}>
                        X
                    </label>
                    {children}
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default InfoPopUp