import Unit from './Unit'
import './List.css'
import arrow from '../../img/arrow.svg'
import { useState } from 'react';
import InfoPopUp from '../PopUp/InfoPopUp';
import axios from 'axios'

function List(props) {

    function isDisabled(status) {
        let selectedCounter;
        if (status) {
            selectedCounter = props.data.filter((element)=>(element.isSelected && element.status === status)).length
        }
        else {
            selectedCounter = props.data.filter((element)=>element.isSelected).length;
        }

        return (selectedCounter > 0)
    }

    const [popInfoIsOpen1, setPopInfoIsOpen1] = useState(false)
    const [popInfoIsOpen2, setPopInfoIsOpen2] = useState(false)

    const handleDateChange = (id, newDateValue, date) => {
        props.setData(prevData =>
          prevData.map(item =>
            { 
                if (item.id === id && date === 'date1') return { ...item, date1: newDateValue }
                if (item.id === id && date === 'date2') return {...item, date2: newDateValue }
                else return {...item}
            }
          )
        );
      };

    const saveDate = async (id, value, field) => {
        try {
          const response = await axios.patch('http://localhost:4000/data/bulk', [
            { id, [field]: value }
          ]);
          props.setData(response.data);
        } catch (error) {
          console.error('Ошибка при сохранении даты:', error);
        }
      };

    // function deleteHistory(id, index) {
    //     let result = props.data.map(element => {
    //         if (element.id === id) {
    //             return {...element, history: element.history.filter((element, idx)=>idx!=index)}
    //         } else {return {...element}}
    //     })
    //     props.setData(result)
    // }

    const deleteHistory = async (id, index) => {
        // Находим элемент, чтобы получить текущий массив истории
        const target = props.data.find(el => el.id === id);
        if (!target) return;
      
        // Формируем новый массив истории без указанного индекса
        const newHistory = target.history.filter((_, idx) => idx !== index);
      
        try {
          // Отправляем PATCH-запрос с обновлённым полем history
          const response = await axios.patch('http://localhost:4000/data/bulk', [
            { id, history: newHistory }
          ]);
          // Обновляем локальное состояние из ответа сервера
          props.setData(response.data);
        } catch (error) {
          console.error('Ошибка при удалении записи истории:', error);
          alert('Не удалось удалить запись. Попробуйте позже.');
        }
      };

    return (
        <>
            <h2>
                Список
            </h2>
            <div className="list">
                <div className='columns'>
                    <h3>Нужен ремонт</h3>
                {
                    props.data.map((element)=>{
                        if (element.status === 'waiting') {
                            return <Unit deleteHistory={deleteHistory} setData={props.setData} deleteUnit={props.deleteUnit} info={element} selectUnit={props.selectUnit} id={element.id} name={element.name} key={element.id} isSelected={element.isSelected}/>
                        }
                    })
                }
                </div>
                <div className='columns__buttons'>
                    <button onClick={()=>setPopInfoIsOpen1(true)} disabled={!isDisabled('waiting')}><img src={arrow}></img></button>
                    <InfoPopUp isOpen={popInfoIsOpen1} onClose={()=>{setPopInfoIsOpen1(false)}}>
                        <h3 style={{textAlign:'center', marginTop:'0'}}>Введите дату передачи на ремонт</h3>
                        {props.data.map((element)=>{
                            if (element.isSelected === true && element.status === 'waiting') {
                                return (
                                    <label key={element.id} >Для {element.name} (инвентарный {element.inv}):
                                        <input
                                            type='text' 
                                            placeholder='ДД.ММ.ГГГГ' 
                                            value={element.date1 ?? ''}
                                            onChange={(e)=>handleDateChange(element.id, e.target.value, 'date1')}
                                            onBlur={(e)=>saveDate(element.id, e.target.value, 'date1')}
                                        />
                                    </label>
                                    )
                            }
                        })}
                        <button style={{marginTop:'15px', height: 'auto', width: 'auto',}} onClick={()=>{setPopInfoIsOpen1(false); props.changeStatus('waiting')}}>Сохранить</button>
                    </InfoPopUp>
                </div>

                <div className='columns'>
                    <h3>В ремонте</h3>
                {
                    props.data.map((element)=>{
                        if (element.status === 'repair') {
                            return <Unit deleteHistory={deleteHistory} setData={props.setData} deleteUnit={props.deleteUnit} info={element} selectUnit={props.selectUnit} id={element.id} name={element.name} key={element.id} isSelected={element.isSelected}/>
                        }
                    })
                }
                </div>
                
                <div className='columns__buttons'>
                    <button onClick={()=>setPopInfoIsOpen2(true)} disabled={!isDisabled('repair')}><img src={arrow}></img></button>
                    <InfoPopUp isOpen={popInfoIsOpen2} onClose={()=>{setPopInfoIsOpen2(false)}}>
                        <h3 style={{textAlign:'center', marginTop:'0'}}>Введите дату получения с ремонта</h3>
                        {props.data.map((element)=>{
                            if (element.isSelected === true && element.status === 'repair') {
                                return (
                                    <label key={element.id} >Для {element.name} (инвентарный {element.inv}):
                                        <input
                                            type='text' 
                                            placeholder='ДД.ММ.ГГГГ' 
                                            value={element.date2 ?? ''}
                                            onChange={(e)=>handleDateChange(element.id, e.target.value, 'date2')}
                                            onBlur={(e)=>saveDate(element.id, e.target.value, 'date2')}
                                        />
                                    </label>
                                    )
                            }
                        })}
                        <button style={{marginTop:'15px', height: 'auto', width: 'auto',}} onClick={()=>{setPopInfoIsOpen2(false);props.changeStatus('repair')}}>Сохранить</button>
                    </InfoPopUp>
                </div> 
                <div className='columns'>
                    <h3>Отработано</h3>
                {
                    props.data.map((element)=>{
                        if (element.status === 'complited') {
                            return <Unit deleteHistory={deleteHistory} setData={props.setData} deleteUnit={props.deleteUnit} info={element} selectUnit={props.selectUnit} id={element.id} name={element.name} key={element.id} isSelected={element.isSelected}/>
                        }
                    })
                }
                </div>
            </div>
            <div className='actions'>
                <button onClick={()=>props.deleteSelected()} disabled={!isDisabled()}>
                    del
                </button>
                <button onClick={()=>props.changeStatus('back')} disabled={!isDisabled()}>
                    move back
                </button>
            </div>
            
        </>
    )
}

export default List