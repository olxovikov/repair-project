import './Unit.css'
import '../PopUp/InfoPopUp'
import InfoPopUp from '../PopUp/InfoPopUp'
import { useState } from 'react'

function Unit(props) {

    const [popInfoIsOpen, setPopInfoIsOpen] = useState(false)

    return (
        <div onClick={()=>{return props.selectUnit(props.id)}} className={props.isSelected ? ('unitCard selectedUnit') : ('unitCard')}>
            <label onClick={()=>{return props.selectUnit(props.id)}} className={props.isSelected ? ('selectedUnit') : (null)}>{props.name}</label>

            {props.isSelected ? (
                <div className='unitButtons'>
                    <button style={{width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'}} 
                    onClick={(event)=>{event.stopPropagation(); setPopInfoIsOpen(true)}}>info</button>
                    <InfoPopUp isOpen={popInfoIsOpen} onClose={()=>setPopInfoIsOpen(false)}>
                        <div className='popup-line'>
                            <label>id: </label>
                            <label>{props.info.id}</label>
                        </div>
                        <div className="popup-line">
                            <label>Наименование: </label>
                            <label>{props.info.name}</label>
                        </div>
                        <div className="popup-line">
                            <label>Инвентарный номер: </label>
                            <label>{props.info.inv}</label>
                        </div>
                        <div className="popup-line">
                            <label>Неисправность: </label>
                            <label>{props.info.defect}</label>
                        </div>
                        <div className="popup-line">
                            <label>Дата передачи на ремонт: </label>
                            <label>{props.info.date1}</label>
                        </div>
                        <div className="popup-line">
                            <label>Дата получения с ремонта: </label>
                            <label>{props.info.date2}</label>
                        </div>
                        <div className="popup-line">
                            <label>Комментарий: </label>
                            <label>{props.info.comment}</label>
                        </div>
                        <div className="popup-line">
                            <label>Статус: </label>
                            <label>{props.info.status}</label>
                        </div>
                    </InfoPopUp>
                    <button style={{width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'}} onClick={(event)=>{event.stopPropagation(); return props.deleteUnit(props.id)}}>del</button>

                </div>
            ) : (null)}

            
        </div>
        
    )
    
}

export default Unit