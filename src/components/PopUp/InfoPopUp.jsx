import { useEffect } from 'react'
import './InfoPopUp.css'
import close from '../../img/close.svg'

function InfoPopUp({isOpen, onClose, children}) {
    useEffect(()=>{
        if (isOpen) {
            document.body.classList.add('no-scroll')
        }
        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [isOpen])

    const onWrapperClick = (event) => {
        if (event.target.classList.contains("modal-wrapper")) onClose()
    }

    return (
        <>
        {isOpen && (
        <div className="modal" onClick={(event)=>event.stopPropagation()}>
            <div className="modal-wrapper" onClick={onWrapperClick}>
                <div className="modal-content">
                    <button title="Закрыть" style={{width: '30px', height:'30px'}} className="modal-close-button" onClick={()=> onClose()}>
                        <img src={close}/>
                    </button>
                    {children}
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default InfoPopUp