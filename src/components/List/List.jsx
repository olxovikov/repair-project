import Column from './Column'
import './List.css'
import arrow from '../../img/arrow.svg'
import trash from '../../img/trash.svg'
import { useState } from 'react';
import InfoPopUp from '../PopUp/InfoPopUp';
import axios from 'axios'

function List(props) {

    function isDisabled(direction, status) {

        if (direction === 'right') {
            return props.data.filter((element)=>(element.isSelected && element.status === status)).length
        }
        if (direction === 'left') {
            return props.data.filter((element)=>(element.isSelected && element.status != 'waiting')).length
        }
        else {
            return props.data.filter((element)=>element.isSelected).length;
        }
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
          const response = await axios.patch(`${props.SERVER_URL}/data/bulk`, [
            { id, [field]: value }
          ]);
          props.setData(response.data);
        } catch (error) {
          console.error('Ошибка при сохранении даты:', error);
        }
      };

    return (
        <div className='list__main'>
            <h2>
                    Список
            </h2>
            <div className="list">
                <Column title={'Нужен ремонт'} status={'waiting'} data={props.data} SERVER_URL={props.SERVER_URL} deleteHistory={props.deleteHistory} setData={props.setData} deleteUnit={props.deleteUnit} selectUnit={props.selectUnit} />
                <div className='columns__buttons'>
                    <button title="Переместить" onClick={()=>setPopInfoIsOpen1(true)} disabled={!isDisabled('right','waiting')}><img src={arrow}></img></button>
                    <InfoPopUp isOpen={popInfoIsOpen1} onClose={()=>{setPopInfoIsOpen1(false)}}>
                        <h3 style={{margin:'0'}}>Передача на ремонт</h3>
                        <div style={{marginTop:'10px'}} className='popup-line'>
                            <label><b>Наименование</b></label>
                            <label><b>Дата</b></label>
                        </div>
                        {props.data.map((element)=>{
                            if (element.isSelected === true && element.status === 'waiting') {
                                return (
                                    <div key={element.id} className='popup-line'>
                                        <label style={{whiteSpace: 'pre-line'}}>{`${element.name}\n(${element.inv})`}
                                        </label>
                                        <input
                                        type='text' 
                                        placeholder='Введите дату...' 
                                        value={element.date1 ?? ''}
                                        onChange={(e)=>handleDateChange(element.id, e.target.value, 'date1')}
                                        onBlur={(e)=>saveDate(element.id, e.target.value, 'date1')}
                                        />
                                    </div>
                                    )
                            }
                        })}
                        <button style={{marginLeft:'25%', marginTop:'10px', height: 'auto', width: '50%', backgroundColor: '#f9f9f9', border: '1px solid #ddd'}} onClick={()=>{setPopInfoIsOpen1(false); props.changeStatus('waiting')}}>Сохранить</button>
                    </InfoPopUp>
                </div>
                <Column title={'В ремонте'} status={'repair'} data={props.data} SERVER_URL={props.SERVER_URL} deleteHistory={props.deleteHistory} setData={props.setData} deleteUnit={props.deleteUnit} selectUnit={props.selectUnit} />
                
                <div className='columns__buttons'>
                    <button title="Переместить" onClick={()=>setPopInfoIsOpen2(true)} disabled={!isDisabled('right','repair')}><img src={arrow}></img></button>
                    <InfoPopUp isOpen={popInfoIsOpen2} onClose={()=>{setPopInfoIsOpen2(false)}}>
                        <h3 style={{textAlign:'center', margin:'0'}}>Получение с ремонта</h3>
                        <div style={{marginTop:'10px'}} className='popup-line'>
                            <label><b>Наименование</b></label>
                            <label><b>Дата</b></label>
                        </div>
                        {props.data.map((element)=>{
                            if (element.isSelected === true && element.status === 'repair') {
                                return (
                                    <div key={element.id} className='popup-line'>
                                        <label style={{whiteSpace: 'pre-line'}}>{`${element.name}\n(${element.inv})`}   
                                        </label>
                                        <input
                                                type='text' 
                                                placeholder='Введите дату...' 
                                                value={element.date2 ?? ''}
                                                onChange={(e)=>handleDateChange(element.id, e.target.value, 'date2')}
                                                onBlur={(e)=>saveDate(element.id, e.target.value, 'date2')}
                                            />
                                    </div>
                                    )
                            }
                        })}
                        <button style={{marginLeft:'25%', marginTop:'10px', height: 'auto', width: '50%', backgroundColor: '#f9f9f9', border: '1px solid #ddd'}} onClick={()=>{setPopInfoIsOpen2(false);props.changeStatus('repair')}}>Сохранить</button>
                    </InfoPopUp>
                </div> 
                <Column title={'Отработано'} status={'complited'} data={props.data} SERVER_URL={props.SERVER_URL} deleteHistory={props.deleteHistory} setData={props.setData} deleteUnit={props.deleteUnit} selectUnit={props.selectUnit} />
            </div>
            <div className='actions'>
                <button title='Удалить' style={{padding: '15px'}} onClick={()=>props.deleteSelected()} disabled={!isDisabled()}>
                    <img style={{height:'25px', width:'25px'}} src={trash} />
                </button>
                <button title="Вернуть назад" style={{padding: '15px'}} onClick={()=>props.changeStatus('back')} disabled={!isDisabled('left')}>
                    <img style={{height:'25px', width:'25px', transform:'rotate(180deg)'}} src={arrow}/> 
                </button>
            </div>
            
        </div>
    )
}

export default List