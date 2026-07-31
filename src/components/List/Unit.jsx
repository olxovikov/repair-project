import './Unit.css'
import '../PopUp/InfoPopUp'
import InfoPopUp from '../PopUp/InfoPopUp'
import { useState, useEffect} from 'react'
import axios from 'axios'
import info from '../../img/info.svg'
import trash from '../../img/trash.svg'

function Unit(props) {

    const [popInfoIsOpen, setPopInfoIsOpen] = useState(false)
    const [place, setPlace] = useState(props.info.place ?? '')
    const [historyIsOpen, setHistoryIsOpen] = useState(false)

    // Синхронизация при изменении выбранного элемента
    useEffect(() => {
        setPlace(props.info.place ?? '');
    }, [props.info.place]);

    const handlePlaceChange = async (id, newPlaceValue) => {
        try {
            // Отправляем PATCH-запрос на сервер
            const response = await axios.patch(`http://localhost:4000/data/${id}`, {
              place: newPlaceValue
              // Если позже добавите другие поля, просто передавайте их в объекте
            });
            
            // После успешного ответа обновляем локальное состояние данными с сервера
            props.setData(response.data);
          } catch (error) {
            console.error('Ошибка при обновлении place:', error);
            // Можно показать уведомление пользователю
            // Опционально: откатить локальное состояние, если нужно
          }
      };

      function getStatus(status) {
        if (status === 'waiting') {return 'Нужен ремонт'}
        if (status === 'repair') {return 'В ремонте'}
        if (status === 'complited') {return 'Отработано'}
        else {return}
      }

    return (
        <div onClick={()=>{return props.selectUnit(props.id)}} className={props.isSelected ? ('unitCard selectedUnit') : ('unitCard')}>
            <button disabled={!props.isSelected} style={!props.isSelected ? {visibility:'hidden', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} : {left:'3px', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} } 
                    onClick={(event)=>{event.stopPropagation(); return props.deleteUnit(props.id)}}><img src={trash}/></button>
            <label onClick={()=>{return props.selectUnit(props.id)}} className={props.isSelected ? ('selectedUnit') : (null)}>{props.name}</label>
            <button disabled={!props.isSelected} style={!props.isSelected ? {visibility:'hidden', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} : {right:'3px', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} } 
                    onClick={(event)=>{event.stopPropagation(); setPopInfoIsOpen(true)}}><img src={info}/></button>
            
            {props.isSelected ? (
                
                    
                    <InfoPopUp isOpen={popInfoIsOpen} onClose={async ()=>{await handlePlaceChange(props.info.id, place); setPopInfoIsOpen(false)}}>
                        <div className='popup-line'>
                            <label>id: </label>
                            <label>{props.info.id || '—'}</label>
                        </div>
                        <div className="popup-line">
                            <label>Статус: </label>
                            <label>{getStatus(props.info.status) ?? '—'}</label>
                        </div>
                        <div className="popup-line">
                            <label>Наименование: </label>
                            <label>{props.info.name || '—'}</label>
                        </div>
                        <div className="popup-line">
                            <label>Инвентарный номер: </label>
                            <label>{props.info.inv || '—'}</label>
                        </div>
                        <div className="popup-line">
                            <label>Неисправность: </label>
                            <label>{props.info.defect || '—'}</label>
                        </div>
                        <div className="popup-line">
                            <label>Дата передачи на ремонт: </label>
                            <label>{props.info.date1 || '—'}</label>
                        </div>
                        <div className="popup-line">
                            <label>Дата получения с ремонта: </label>
                            <label>{props.info.date2 || '—'}</label>
                        </div>
                        <div className="popup-line">
                            <label>Комментарий: </label>
                            <label>{props.info.comment || '—'}</label>
                        </div>
                        <div className='popup-line'>
                            <label>Текущее местоположение: </label>
                            <input 
                                type='text' 
                                value={place}
                                onChange={(e)=>{setPlace(e.target.value)}}
                            >
                            </input>
                        </div>
                        {props.info.history.length ?
                        <>
                        <div className='popup-line'>
                            <label>История: </label>
                            <a style={{cursor: 'pointer'}} onClick={()=>setHistoryIsOpen(!historyIsOpen)}>{historyIsOpen ? 'Скрыть историю' : 'Показать историю'}</a>
                        </div>
                        {historyIsOpen 
                        ? <div style={{textAlign: 'center'}}>
                        <hr />
                        <strong style={{display: 'block', textAlign: 'center'}}>История предыдущих ремонтов</strong>
                        <hr />
                        {props.info.history.map((element, index) => {
                            return <div key={index}>
                                <label style={{display: 'block', whiteSpace: 'pre-line'}}>{element}</label>
                                <a style={{cursor:'pointer'}} onClick={()=>props.deleteHistory(props.info.id, index)}>delete</a>
                                {(index+1 === props.info.history.length) ? null : <hr/>}
                            </div>
                        })}
                    </div> : null}
                        
                        </>
                        : null}
                    </InfoPopUp>
                    // {/* <button style={{width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'}} onClick={(event)=>{event.stopPropagation(); return props.deleteUnit(props.id)}}>del</button> */}

                
            ) : (null)}

            
        </div>
        
    )
    
}

export default Unit