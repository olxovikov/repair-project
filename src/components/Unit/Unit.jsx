import './Unit.css'
import '../PopUp/InfoPopUp'
import InfoPopUp from '../PopUp/InfoPopUp'
import UnitContent from './UnitContent'
import { useState, useEffect} from 'react'
import axios from 'axios'
import info from '../../img/info.svg'
import trash from '../../img/trash.svg'
import close from '../../img/close.svg'

function Unit(props) {

    const [popInfoIsOpen, setPopInfoIsOpen] = useState(false)
    const [place, setPlace] = useState(props.info.place ?? '')
    const [comment, setComment] = useState(props.info.comment ?? '')
    const [defect, setDefect] = useState(props.info.defect ?? '')
    const [name, setName] = useState(props.info.name ?? '')
    const [historyIsOpen, setHistoryIsOpen] = useState(false)

    // Синхронизация при изменении выбранного элемента
    useEffect(() => {
        setPlace(props.info.place ?? '');
        setComment(props.info.comment ?? '');
        setDefect(props.info.defect ?? '');
        setName(props.info.name ?? '');
    }, [props.info.place, props.info.comment, props.info.defect, props.info.name]);

    const handlePlaceChange = async (id, newPlaceValue) => {
        try {
            // Отправляем PATCH-запрос на сервер
            const response = await axios.patch(`${props.SERVER_URL}/data/${id}`, {
              place: newPlaceValue
              // Если позже добавите другие поля, просто передавайте их в объекте
            });
            
            // После успешного ответа обновляем локальное состояние данными с сервера
            props.setData(response.data);
          } catch (error) {
            console.error('Ошибка при обновлении Place:', error);
            // Можно показать уведомление пользователю
            // Опционально: откатить локальное состояние, если нужно
          }
      };

      const handleCommentChange = async (id, newCommentValue) => {
        try {
            // Отправляем PATCH-запрос на сервер
            const response = await axios.patch(`${props.SERVER_URL}/data/${id}`, {
              comment: newCommentValue
            });
            
            // После успешного ответа обновляем локальное состояние данными с сервера
            props.setData(response.data);
          } catch (error) {
            console.error('Ошибка при обновлении Comment:', error);
          }
      };

      const handleDefectChange = async (id, newDefectValue) => {
        try {
            // Отправляем PATCH-запрос на сервер
            const response = await axios.patch(`${props.SERVER_URL}/data/${id}`, {
              defect: newDefectValue
            });
            
            // После успешного ответа обновляем локальное состояние данными с сервера
            props.setData(response.data);
          } catch (error) {
            console.error('Ошибка при обновлении Defect:', error);
          }
      };

      const handleNameChange = async (id, newNameValue) => {
        try {
            // Отправляем PATCH-запрос на сервер
            const response = await axios.patch(`${props.SERVER_URL}/data/${id}`, {
              name: newNameValue
            });
            
            // После успешного ответа обновляем локальное состояние данными с сервера
            props.setData(response.data);
          } catch (error) {
            console.error('Ошибка при обновлении Name:', error);
          }
      };      
    if (props.popUpIsNeeded === true) {
        return (
            <div onClick={()=>{return props.selectUnit(props.id)}} className={props.isSelected ? ('unitCard selectedUnit') : ('unitCard')}>
                <button title="Удалить" id='trash' disabled={!props.isSelected} style={!props.isSelected ? {visibility:'hidden', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} : {left:'3px', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} } 
                        onClick={(event)=>{event.stopPropagation(); return props.deleteUnit(props.id)}}><img src={trash}/></button>
                <label onClick={()=>{return props.selectUnit(props.id)}} className={props.isSelected ? ('selectedUnit') : (null)}>{props.name}</label>
                <button title="Информация" id='info' disabled={!props.isSelected} style={!props.isSelected ? {visibility:'hidden', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} : {right:'3px', width: 'auto', height: 'auto', marginTop: '0px', padding: '0px'} } 
                        onClick={(event)=>{event.stopPropagation(); setPopInfoIsOpen(true)}}><img src={info}/></button>
                
                {props.isSelected ? (
                    
                        
                        <InfoPopUp SERVER_URL={props.SERVER_URL} isOpen={popInfoIsOpen} onClose={async ()=>{await handlePlaceChange(props.info.id, place); await handleCommentChange(props.info.id, comment); await handleDefectChange(props.info.id, defect); await handleNameChange(props.info.id, name); setPopInfoIsOpen(false)}}>
                           <UnitContent 
                           name={name} setName = {setName}
                           defect={defect} setDefect={setDefect}
                           comment={comment} setComment={setComment}
                           place={place} setPlace={setPlace}
                           historyIsOpen={historyIsOpen} setHistoryIsOpen={setHistoryIsOpen}
                           deleteHistory={props.deleteHistory} close={close}
                           info={props.info}
                           handlePlaceChange={handlePlaceChange} handleCommentChange={handleCommentChange}
                           handleDefectChange={handleDefectChange} handleNameChange={handleNameChange}
                           />
                        </InfoPopUp>
    
                    
                ) : (null)}
    
                
            </div>
            
        )
    } else {
        return (
            <div style={{
                position: 'relative',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '12px',
                background: '#f9f9f9',
                // background: 'white',
                textAlign: 'start',
                width: '70%',
              }}>
                <UnitContent 
                    name={name} setName = {setName}
                    defect={defect} setDefect={setDefect}
                    comment={comment} setComment={setComment}
                    place={place} setPlace={setPlace}
                    historyIsOpen={historyIsOpen} setHistoryIsOpen={setHistoryIsOpen}
                    deleteHistory={props.deleteHistory} close={close}
                    info={props.info}
                    handlePlaceChange={handlePlaceChange} handleCommentChange={handleCommentChange}
                    handleDefectChange={handleDefectChange} handleNameChange={handleNameChange}
                />
            </div>
        )
    }
    
}

export default Unit